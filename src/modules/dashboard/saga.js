import { all, takeLatest, delay, put, call, fork, select, take } from 'redux-saga/effects';
import _ from 'lodash';
import NetInfo from "@react-native-community/netinfo";
import * as Actions from './actions';
import * as EventActions from '../events/actions';
import * as UserActions from '../user/actions';
import * as ContentActions from '../contents/actions';
import * as ComplaintsActions from '../complaints/actions';
import { getUserInfo } from '../user/selectors';
import { getLanguage } from '../language/selectors';
import { getHomeFeed, getNotification } from './selectors';
import * as DashboardAPI from './api';
import { saga } from '../../common';
import Storage from '../../common/storages';
import { NOTIFICATIONS } from '../../common/constants';
import { checkVersion } from "react-native-check-version";
import { USER_TYPE, USER_TYPE_SELECTED_STORE_KEY } from '../user/constants';
import * as AssetIconsPackBlue from '../../common/icons/AssetIconsBlue';
import * as AssetIconsPackBlack from '../../common/icons/AssetIconsBlack';
import { userUtils, notificationUtil } from '../../common/utils';
import DistrictWisePhoneNumber from './DistrictWisePhoneNumber.json';
const { types: ActionTypes } = Actions;

function* loadNotification(action) {
    const { reset } = action.payload.data;
    if (reset) {
        yield put(Actions.resetNotificationPage());
    }
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    const notifications = yield select(getNotification);
    const newPage = notifications.page + 1;
    let params = {
        langId: (yield select(getLanguage)).langId,
        userId,
        page: newPage,
        size: 10,
    }
    yield fork(saga.handleAPIRequest, DashboardAPI.fetchNotifications, userId, params);
}

async function checkUpdateNeeded() {
    return await checkVersion();
}

function* appPlayStoreVersionCheck() {
    const netInfo = yield call([NetInfo, 'fetch']);
    if (netInfo.isInternetReachable) {
        const response = yield call(checkUpdateNeeded);
        if (response.needsUpdate) {
            yield put(Actions.checkAppUpdate(true));
            const version = response.version;
            if (version !== undefined) {
                if (version[version.length - 1] === '0') {
                    yield put(Actions.setPlayStoreAppVersionData(false));
                } else if (version[version.length - 1] === '1') {
                    yield put(Actions.setPlayStoreAppVersionData(true));
                }
            }
        } else {
            yield put(Actions.checkAppUpdate(false));
        }
    }
}

function* loadHomeFeed(action) {
    const { reset, filterId } = action.payload.data;
    if (reset) {
        yield put(Actions.resetHomeFeedPage());
    }
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : null;
    const mode = userType.name === USER_TYPE.CHILD ? true : false;
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    const homeFeed = yield select(getHomeFeed);
    const newPage = homeFeed.page + 1;
    let homeFeedRequest = {
        langId: (yield select(getLanguage)).langId,
        userId,
        page: newPage,
        size: 10,
    }
    if (filterId != undefined) {
        homeFeedRequest.topicId = filterId;
    }
    console.log(homeFeedRequest);
    if (!userUtils.hasChildRole(userInfo)) {
        homeFeedRequest = { ...homeFeedRequest, childMode: mode }
    }
    yield fork(saga.handleAPIRequest, DashboardAPI.fetchHomeFeed, { homeFeedListData: homeFeedRequest });
}

function* handleLikePost(action) {
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, DashboardAPI.setPostLike, userId, action.payload.data);
}

function* handleRatePost(action) {
    const { postId, starCount } = action.payload.data;
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, DashboardAPI.setPostRate, userId, postId, starCount);
}

function* handleShareApp(action) {
    const { postId, appId } = action.payload.data;
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, DashboardAPI.saveAppShareData, userId, postId, appId);
}

function* userTypeThemeSelection(action) {
    const { name, themeContext, roleType } = action.payload.data;
    let assetIcons = {};
    if (name === USER_TYPE.CHILD) {
        themeContext.toggleTheme(USER_TYPE.CHILD);
        assetIcons = AssetIconsPackBlue.default;
    } else {
        themeContext.toggleTheme();
        assetIcons = AssetIconsPackBlack.default
    }
    let userType = {
        name: name,
        roleType: roleType,
        assetIcons: assetIcons
    }
    yield call([Storage, 'setItem'], USER_TYPE_SELECTED_STORE_KEY, JSON.stringify(userType));
    yield put(UserActions.setUserType(userType));
    if (name === USER_TYPE.CHILD) {
        yield put(Actions.navigateToDashboardSummary());
        yield put(Actions.loadHomeFeed({ reset: true }));
        yield put(ContentActions.loadContentList());
        yield put(ComplaintsActions.loadComplaintList());
    }
}

function* handleReadNotification(action) {
    const { notificationId, additionalData } = action.payload.data;
    let body = {
        notificationIds: notificationId
    }
    yield fork(saga.handleAPIRequest, DashboardAPI.readNotification, body);
    if (additionalData != undefined && additionalData.notificationType === NOTIFICATIONS.EVENT_NOTIFICATION) {
        yield put(EventActions.eventById(additionalData.notificationTypeId));
    }
}

function* handleUnReadNotificationFilter(action) {
    let switchBtnChange = action.payload.data;
    const notif = yield select(getNotification);
    let data = notif.data;
    let newNotif = [];
    if (switchBtnChange) {
        data.map(obj => {
            if (obj.read) { newNotif.push(obj) };
        });
    } else {
        newNotif = data;
    }
    console.tron.log(newNotif)
    // yield put(Actions.setNotification(newNotif));

}

function* handleLoadTollFreeNumbers() {
    const userInfo = yield select(getUserInfo);
    const { district } = userInfo;
    const getDistrictWiseTollFreeNumber = _.filter(DistrictWisePhoneNumber.options, { 'district_id': district.id });
    yield put(Actions.setTollFreeNumbers(getDistrictWiseTollFreeNumber.length > 0 ? getDistrictWiseTollFreeNumber[0].phoneNumber : ''));
}

export default function* dashboardSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_NOTIFICATION, loadNotification),
        takeLatest(ActionTypes.APP_PLAYSTORE_VERSION_CHECK, appPlayStoreVersionCheck),
        takeLatest(ActionTypes.LOAD_HOME_FEED, loadHomeFeed),
        takeLatest(ActionTypes.USERTYPE_THEME_SWITCH, userTypeThemeSelection),
        takeLatest(ActionTypes.LIKE_POST, handleLikePost),
        takeLatest(ActionTypes.RATE_POST, handleRatePost),
        takeLatest(ActionTypes.SHARE_APP, handleShareApp),
        takeLatest(ActionTypes.READ_NOTIFICATION, handleReadNotification),
        takeLatest(ActionTypes.FILTER_UNREAD_NOTIFICATIONS, handleUnReadNotificationFilter),
        takeLatest(ActionTypes.LOAD_TOLLFREE_NUMBERS, handleLoadTollFreeNumbers),
    ]);
}
