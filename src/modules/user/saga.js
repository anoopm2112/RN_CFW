import { all, take, takeLatest, call, fork, delay, put, select, cancel, race, spawn } from 'redux-saga/effects';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import CryptoES from '@genee/crypto-es';
import _ from 'lodash';
import Storage from '../../common/storages';
import moment from 'moment';
import OneSignal from 'react-native-onesignal';
import { hasUserSetPinCode, deleteUserPinCode } from '@haskkor/react-native-pincode';
import { saga, I18n, utils, actions as CommonActions } from '../../common';
import * as Actions from './actions';
import { OTP_WAITING_PERIOD, USER_FCM_TOKEN, USER_TYPE } from './constants';
import * as DashboardActions from '../dashboard/actions';
import * as SplashActions from '../splash/actions';
import * as UserAPI from './api';
import { getUser, getEncryptionKey, getUserType } from './selectors';
import { DEVELOPER_OPTIONS_STORE_KEY } from '../settings/constants';
import { AUTH_DATA_STORE_KEY, USER_INFO_STORE_KEY, USER_TYPE_SELECTED_STORE_KEY, ROLE_TYPE,USER_CHANNEL_IDS } from './constants';
import * as SettingsActions from '../settings/actions';
import { API_PROVIDER_TYPE } from '../../common/constants';
import container, { getInstance, removeInstance, resetInstance } from '../../common/realm';
import * as AssetIconsPackBlue from '../../common/icons/AssetIconsBlue';
import * as AssetIconsPackBlack from '../../common/icons/AssetIconsBlack';
import { getLanguage } from '../language/selectors';
import { getUserInfo } from './selectors';
import dropDownData from './data.json';
import firebase from 'react-native-firebase';

const { toastUtils: { infoToast, successToast, errorToast, hideToast }, userUtils, notificationUtil } = utils;

const { types: CommonActionTypes, navigation: { navigateBack } } = CommonActions;
const { types: ActionTypes } = Actions;

function* authenticate(action) {
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : {};
    yield call(infoToast, I18n.t('logging_in'), 0);
    yield fork(saga.handleAPIRequest, UserAPI.authenticate, action.payload.data.username, action.payload.data.password, userType.roleType);
    const authSuccessAction = yield take(ActionTypes.AUTH_SUCCESS);
    yield fork(saga.handleAPIRequest, UserAPI.getUserInfo);
    const userInfoSuccessAction = yield take(ActionTypes.FETCH_USER_INFO_SUCCESS);
    yield call([Storage, 'setItem'], AUTH_DATA_STORE_KEY, JSON.stringify(authSuccessAction.payload.data));
    yield call([Storage, 'setItem'], USER_INFO_STORE_KEY, JSON.stringify(userInfoSuccessAction.payload.data));
    const externalUserId = userInfoSuccessAction.payload.data.externalUserId;
    const token = yield call(getToken);
    const { id, userGroups, roles } = userInfoSuccessAction.payload.data;
    yield fork(saga.handleAPIRequest, UserAPI.addFirebaseFcmToken, { fcmToken: token }, id);
    yield call([Storage, 'setItem'], USER_FCM_TOKEN, JSON.stringify(token));
    let channels = [];
    _.forEach(userGroups, function (value) {
        let channel = notificationUtil.subscribeChannel(value.name);
        channels.push(channel._channelId);
    });
    _.forEach(roles, function (value) {
        let channel = notificationUtil.subscribeChannel(value.key);
        channels.push(channel._channelId);
    });
    yield call([Storage, 'setItem'], USER_CHANNEL_IDS, JSON.stringify(channels));
    yield put(Actions.setChannelId(channels));
    // const { apiProviders } = userInfoSuccessAction.payload.data.defaultOrganization;
    // let apiProviderNotification;
    // let appId = '';
    // if (Array.isArray(apiProviders) && apiProviders.length > 0) {
    //     apiProviderNotification = _.find(apiProviders, function (o) { return o.type === API_PROVIDER_TYPE.NOTIFICATION; });
    // }
    // if (apiProviderNotification) {
    //     appId = apiProviderNotification.appId;
    //     if (appId && externalUserId) {
    //         yield call(initializeOneSignal, { appId, externalUserId });
    //     }
    // }
    yield call(hideToast);
    // Check if encryption key is available in state
    const encryptionKey = yield select(getEncryptionKey);
    if (encryptionKey) {
        // Check if realm is loaded
        const { realm } = container;
        if (realm === undefined) {
            yield call(getInstance, encryptionKey);
        }
        yield put(DashboardActions.navigateToDashboardSummary());
    } else {
        const isPassCodeRegistered = yield call(hasUserSetPinCode);
        yield put(Actions.navigateToPassCode({ status: isPassCodeRegistered ? 'enter' : 'choose', reinitialize: true, forgetPinStatus: true }));
    }
    // yield put(DashboardActions.navigateToCustomerDashboardSummary());
}

async function getToken() {
    return await getFirebaseToken();
}

async function getFirebaseToken() {
    let fcmToken = '';
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        fcmToken = await firebase.messaging().getToken();
    } else {
        try {
            await firebase.messaging().requestPermission();
            fcmToken = await firebase.messaging().getToken();
        } catch (error) {
            console.tron.log('permission rejected');
        }
    }
    return fcmToken;
}

function* initializeOneSignal({ appId, externalUserId }) {
    OneSignal.setAppId(appId);
    OneSignal.setLogLevel(4, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    if (Platform.OS === 'ios') {
        OneSignal.promptForPushNotificationsWithUserResponse();
    }
    let externalUserInit = false;
    OneSignal.setExternalUserId(externalUserId, (result) => {
        if (result?.push?.success) {
            externalUserInit = true;
        }
    });
    // Sometimes OneSignal SDK fails to register external user first time.
    // If so, wait for around 8 seconds and register again.
    setTimeout(() => {
        if (!externalUserInit) {
            OneSignal.setExternalUserId(externalUserId, (result) => {
                if (result?.push?.success) {
                    externalUserInit = true;
                }
            });
        }
    }, 8000);
}

function* handleLogout(action) {
    const userInfo = yield select(getUserInfo);
    const { id, userGroups, roles } = userInfo;
    _.forEach(userGroups, function (value) {
        let channel = notificationUtil.unSubscribeChannel(value.name);
    });
    _.forEach(roles, function (value) {
        let channel = notificationUtil.unSubscribeChannel(value.key);
    });
    let token = yield call([Storage, 'getItem'], USER_FCM_TOKEN);
    const { sessionExpired } = action.payload.data || {};
    OneSignal.removeExternalUserId();
    yield call(removePrimaryStoreKeys);
    if (!sessionExpired) {
        yield call(removeSecondaryStoreKeys);
        const encryptionKey = yield select(getEncryptionKey);
        yield call(removeInstance, encryptionKey);
        yield put(Actions.setEncryptionKey(undefined));
        yield call(deleteUserPinCode);
        yield put(SettingsActions.resetDeveloperOptions());
        yield fork(saga.handleAPIRequest, UserAPI.logout, { fcmToken: token }, id);
    }
    yield put(Actions.navigateToUserType());
}

function* removePrimaryStoreKeys() {
    yield fork([Storage, 'removeItem'], AUTH_DATA_STORE_KEY);
    yield fork([Storage, 'removeItem'], USER_INFO_STORE_KEY);
    yield fork([Storage, 'removeItem'], USER_TYPE_SELECTED_STORE_KEY);
}

function* removeSecondaryStoreKeys() {
    yield fork([Storage, 'removeItem'], DEVELOPER_OPTIONS_STORE_KEY);
}

function* updateResendOtpButtonState() {
    let waitingPeriodInSeconds = OTP_WAITING_PERIOD * 60; // Waiting period in seconds for showing progress circle
    while (true) {
        let user = yield select(getUser);
        if (user.otpVerify.progress < 1) {
            let interval = moment().diff(user.otpVerify.requestedAt, 'seconds');
            let progress = interval / waitingPeriodInSeconds;
            let shouldResend = false;
            if (progress >= 1) {
                progress = 1;
                shouldResend = true;
            }
            yield put(Actions.updateResendOtpButtonState({ progress, shouldResend }));
        }
        yield delay(2500);
    }
}

function* handleSendOtp(action) {
    const { phoneNumber, forgetPassword } = action.payload.data;
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : {};
    let otpRequest = {
        mobile: phoneNumber,
        isResend: false,
        role_key: userType.roleType,
        forgetPassword
    }
    if (forgetPassword) {
        otpRequest.action = 'reset'
    } else {
        otpRequest.action = 'sign-up'
    }
    yield call(infoToast, I18n.t('verifying_phone_number'), 0);
    yield fork(saga.handleAPIRequest, UserAPI.sendOrResendOtp, otpRequest);
    yield take(ActionTypes.OTP_API_SUCCESS);
    yield call(hideToast);
    yield put(Actions.navigateToOtpVerification(action.payload.data));
    yield delay(500);
    const updateResendOtpButtonStateTask = yield fork(updateResendOtpButtonState);
    yield take(CommonActionTypes.ROUTE_CHANGED);
    yield cancel(updateResendOtpButtonStateTask);
}

function* handleResendOtp(action) {
    const { phoneNumber, forgetPassword } = action.payload.data;
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : {};
    let otpResendRequest = {
        mobile: phoneNumber,
        isResend: true,
        role_key: userType.roleType
    }
    if (forgetPassword) {
        otpResendRequest.action = 'reset'
    } else {
        otpResendRequest.action = 'sign-up'
    }
    yield call(infoToast, I18n.t('request_new_otp'), 0);
    yield fork(saga.handleAPIRequest, UserAPI.sendOrResendOtp, otpResendRequest);
    yield take(ActionTypes.OTP_RESEND_API_SUCCESS);
    yield call(successToast, I18n.t('request_new_otp_success'));
}

function* handleVerifyOtp(action) {
    yield call(loadDistrict);
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : {};
    let role_key = userType.roleType;
    yield call(infoToast, I18n.t('verifying_otp'), 0);
    const { firstNumber, secondNumber, thirdNumber, fourthNumber, phoneNumber, forgetPassword } = action.payload.data;
    const otp = firstNumber + secondNumber + thirdNumber + fourthNumber;
    const verifyOTPRequest = {
        mobile: phoneNumber,
        otp,
        role_key
    };
    if (forgetPassword) {
        verifyOTPRequest.action = 'reset';
    } else {
        verifyOTPRequest.action = 'sign-up';
    }
    yield fork(saga.handleAPIRequest, UserAPI.verifyOtp, verifyOTPRequest);
    const otpVerifySuccessAction = yield take(ActionTypes.OTP_VERIFY_API_SUCCESS);
    let data = {
        phoneNumber: phoneNumber,
        requestId: otpVerifySuccessAction.payload.data
    }
    yield call(hideToast);
    if (forgetPassword) {
        yield put(Actions.navigateToResetPassword(otpVerifySuccessAction.payload.data));
    } else {
        yield put(Actions.navigateToSignUp(data));
    }
}

function* loadDistrict() {
    const langId = yield select(getLanguage);
    let language = langId.langId;
    const options = dropDownData.district.options;
    let districtArray = [];
    options.map((item) => {
        if (language === 1) {
            districtArray.push({ 'id': item.district_id, 'label': item.label.en_IN });
        } else if (language === 2) {
            districtArray.push({ 'id': item.district_id, 'label': item.label.ml_IN });
        }
    });
    const classOptions = dropDownData.class.options;
    let classArray = [];
    classOptions.map((item) => {
        if (language === 1) {
            classArray.push({ 'id': item.class_id, 'label': item.label.en_IN });
        } else if (language === 2) {
            classArray.push({ 'id': item.class_id, 'label': item.label.ml_IN });
        }
    });
    const lsgiTypeOptions = dropDownData['LSGI-types'].options;
    let lsgiTypeArray = [];
    lsgiTypeOptions.map((item) => {
        if (language === 1) {
            lsgiTypeArray.push({ 'id': item.organization_type_id, 'label': item.label.en_IN });
        } else if (language === 2) {
            lsgiTypeArray.push({ 'id': item.organization_type_id, 'label': item.label.ml_IN });
        }
    });
    yield put(Actions.setDistrict({ district: districtArray, class: classArray, lsgiType: lsgiTypeArray }));
}

function* loadLSGI(action) {
    const { districtId, lsgiTypeId } = action.payload.data;
    const langId = yield select(getLanguage);
    let language = langId.langId;
    let loadLSGIRequest = {
        districtId,
        langId: language,
        lsgiTypeId
    }
    yield fork(saga.handleAPIRequest, UserAPI.fetchLsgis, loadLSGIRequest);
}

function* handleResetPassword(action) {
    yield call(infoToast, I18n.t('resetting_password'), 0);
    yield fork(saga.handleAPIRequest, UserAPI.resetPassword, action.payload.data);
    yield take(ActionTypes.RESET_PASSWORD_API_SUCCESS);
    yield put(Actions.navigateToLogin());
    yield call(successToast, I18n.t('reset_password_success'));
}

function* handleUpdateProfile(action) {
    yield call(infoToast, I18n.t('updating_profile'), 0);
    let { id } = action.payload.data;
    yield fork(saga.handleAPIRequest, UserAPI.updateProfile, action.payload.data, id);
    yield take(ActionTypes.UPDATE_PROFILE_API_SUCCESS);
    let userInfo = yield call([Storage, 'getItem'], USER_INFO_STORE_KEY);
    userInfo = userInfo ? JSON.parse(userInfo) : {};
    userInfo = { ...userInfo, ...action.payload.data };
    yield call([Storage, 'setItem'], USER_INFO_STORE_KEY, JSON.stringify(userInfo));
    yield put(Actions.setUpdatedProfile(userInfo));
    yield put(navigateBack());
    yield call(successToast, I18n.t('profile_updated'));
}

function* handleUpdatePassword(action) {
    yield call(infoToast, I18n.t('updating_password'), 0);
    yield fork(saga.handleAPIRequest, UserAPI.updatePassword, action.payload.data);
    yield take(ActionTypes.UPDATE_PASSWORD_API_SUCCESS);
    yield put(navigateBack());
    yield call(successToast, I18n.t('update_password_success'));
}

function* handleSignUp(action) {
    const userType = yield select(getUserType);
    yield call(infoToast, I18n.t('signup_processing_request'), 0);
    yield fork(saga.handleAPIRequest, UserAPI.signUp, action.payload.data, userType.roleType);
    yield take(ActionTypes.SIGN_UP_API_SUCCESS);
    yield call(hideToast);
    yield call(successToast, I18n.t('user_created_successfully'));
    yield put(Actions.navigateToLogin());
}

function* handleRefreshToken(action) {
    yield call([Storage, 'setItem'], AUTH_DATA_STORE_KEY, JSON.stringify(action.payload.data));
}

function* prepareEncryptionKey(action) {
    const { pinCode, oldPassCode, reinitialize } = action.payload.data; // pinCode is used for generating the key
    const deviceId = yield call([DeviceInfo, 'getDeviceId']); // deviceId will be the salt
    if (oldPassCode) {
        yield call(resetInstance, CryptoES.PBKDF2(oldPassCode, deviceId, { keySize: 512 / 32 }).toArrayBuffer())
    }
    const key512Bits = CryptoES.PBKDF2(pinCode, deviceId, { keySize: 512 / 32 }).toArrayBuffer();
    yield put(Actions.setEncryptionKey(key512Bits));
    if (reinitialize) {
        // Re-initialize here
        yield put(SplashActions.initialize());
    }
}

function* userTypeThemeSelection(action) {
    const { name, themeContext, roleType } = action.payload.data;
    let assetIcons = {};
    if (name === USER_TYPE.CHILD) {
        themeContext.toggleTheme(USER_TYPE.CHILD);
        assetIcons = AssetIconsPackBlue.default
    } else {
        assetIcons = AssetIconsPackBlack.default
    }
    let userType = {
        name: name,
        roleType: roleType,
        assetIcons: assetIcons
    }
    yield call([Storage, 'setItem'], USER_TYPE_SELECTED_STORE_KEY, JSON.stringify(userType));
    yield put(Actions.setUserType(userType));
    yield put(Actions.navigateToLogin(name));
}

export default function* userSaga() {
    yield all([
        takeLatest(ActionTypes.AUTHENTICATE, authenticate),
        takeLatest(CommonActionTypes.LOG_OUT, handleLogout),
        takeLatest(ActionTypes.SEND_OTP, handleSendOtp),
        takeLatest(ActionTypes.RESEND_OTP, handleResendOtp),
        takeLatest(ActionTypes.VERIFY_OTP, handleVerifyOtp),
        takeLatest(ActionTypes.RESET_PASSWORD, handleResetPassword),
        takeLatest(ActionTypes.UPDATE_PROFILE, handleUpdateProfile),
        takeLatest(ActionTypes.UPDATE_PASSWORD, handleUpdatePassword),
        takeLatest(ActionTypes.PREPARE_ENCRYPTION_KEY, prepareEncryptionKey),
        takeLatest(CommonActionTypes.REFRESH_TOKEN_API_SUCCESS, handleRefreshToken),
        takeLatest(ActionTypes.USERTYPE_THEME_SELECTION, userTypeThemeSelection),
        takeLatest(ActionTypes.USER_SIGN_UP, handleSignUp),
        takeLatest(ActionTypes.LOAD_DISTRICT, loadDistrict),
        takeLatest(ActionTypes.LOAD_LSGI_TYPE, loadLSGI),
    ]);
}
