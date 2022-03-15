import { all, takeLatest, call, select, put, delay } from 'redux-saga/effects';
import Storage from '../../common/storages';
import { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import * as Actions from './actions';
import * as LanguageActions from '../language/actions';
import * as PermissionActions from '../permissions/actions';
import * as UserActions from '../user/actions';
import * as DashboardActions from '../dashboard/actions';
import * as SettingsActions from '../settings/actions';
import * as EventActions from '../events/actions';
import { LANGUAGES, LANGUAGE_STORE_KEY } from '../language/constants';
import { AUTH_DATA_STORE_KEY, USER_INFO_STORE_KEY, USER_TYPE_SELECTED_STORE_KEY } from '../user/constants';
import { ROUTE_KEYS as PERMISSIONS_ROUTE_KEYS, PERMISSION_CHECK_STORE_KEY } from '../permissions/constants';
import { DEVELOPER_OPTIONS_STORE_KEY } from '../settings/constants';
import { NOTIFICATIONS } from '../../common/constants';
import { getLanguage } from '../language/selectors';
import { getSideBarData, getPushNotifications } from '../dashboard/selectors';
import { userUtils } from '../../common/utils';
import { getEncryptionKey } from '../user/selectors';
import { getNotifications } from '../splash/selectors';
import container, { getInstance } from '../../common/realm';

const { types: ActionTypes } = Actions;
const { types: ActionTypesDashboard } = DashboardActions;

function* initialize() {
    // Check if language is available in Storage
    let language = yield call([Storage, 'getItem'], LANGUAGE_STORE_KEY);
    language = language ? JSON.parse(language) : null;
    if (language) {
        let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
        userType = userType ? JSON.parse(userType) : null;
        yield put(UserActions.setUserType(userType));
        const languageData = yield select(getLanguage);
        if (!languageData.hasOwnProperty('locale')) {
            yield put(LanguageActions.languageSelect({ language }));
        }
        let allPermissionGranted = yield call([Storage, 'getItem'], PERMISSION_CHECK_STORE_KEY);
        if (allPermissionGranted === 'permissionChecked') {
            // Check if user authentication data is available in Storage
            let authData = yield call([Storage, 'getItem'], AUTH_DATA_STORE_KEY);
            authData = authData ? JSON.parse(authData) : null;
            let userInfo = yield call([Storage, 'getItem'], USER_INFO_STORE_KEY);
            userInfo = userInfo ? JSON.parse(userInfo) : null;
            yield put(UserActions.loadDistrict());
            if (authData && userInfo) {
                // Check if encryption key is available in state
                const encryptionKey = yield select(getEncryptionKey);
                const notifications = yield select(getPushNotifications);
                if (encryptionKey) {
                    // Check if realm is loaded
                    const { realm } = container;
                    if (realm === undefined) {
                        yield call(getInstance, encryptionKey);
                    }
                    yield put(UserActions.setAuthDataFromPersistantStorage(authData));
                    yield put(UserActions.setUserInfoFromPersistantStorage(userInfo));
                    // Load developer options from Storage
                    let developerOptions = yield call([Storage, 'getItem'], DEVELOPER_OPTIONS_STORE_KEY);
                    developerOptions = developerOptions ? JSON.parse(developerOptions) : null;
                    if (developerOptions) {
                        yield put(SettingsActions.setDeveloperOptions(developerOptions));
                    }
                    if (notifications != undefined && notifications !== null) {
                        const { notifications: { data } } = notifications;
                        if (data.notificationType === NOTIFICATIONS.EVENT_NOTIFICATION) {
                            yield put(EventActions.eventById(data.notificationTypeId));
                        }
                        // yield put(DashboardActions.notifications());
                    } else {
                        yield put(DashboardActions.navigateToDashboardSummary());
                    }
                } else {
                    const isPassCodeRegistered = yield call(hasUserSetPinCode);
                    yield put(UserActions.navigateToPassCode({ status: isPassCodeRegistered ? 'enter' : 'choose', reinitialize: true, forgetPinStatus: true }));
                }
                // yield put(DashboardActions.navigateToCustomerDashboardSummary());
            } else {
                yield put(UserActions.navigateToUserType());
            }
        } else {
            const sideBarData = yield select(getSideBarData);
            if (sideBarData.currentRoute !== PERMISSIONS_ROUTE_KEYS.PERMISSION_GRANT) {
                yield put(PermissionActions.navigateToPermissionsScreen());
            }
        }
    } else {
        yield put(LanguageActions.languageSelect({ language: LANGUAGES[0] }));
        yield put(LanguageActions.navigateToLanguageSelectScreen());
    }
}
function* showNotification(action) {
    const pushNotifications = yield select(getPushNotifications);
    if (pushNotifications != undefined && pushNotifications !== null) {
        const { notifications: { data } } = pushNotifications;
        if (data.notificationType === NOTIFICATIONS.EVENT_NOTIFICATION) {
            yield put(DashboardActions.readNotification({ notificationId: data.notificationId, additionalData: data }));
            yield put(EventActions.eventById(data.notificationTypeId));
        }
    }
}

export default function* splashSaga() {
    yield all([
        takeLatest(ActionTypes.INITIALIZE, initialize),
        takeLatest(ActionTypesDashboard.SHOW_NOTIFICATION, showNotification),
    ]);
}
