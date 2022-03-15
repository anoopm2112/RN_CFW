import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as DASHBOARD_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate, navigateWithReset } } = actions;

export const types = {
    INITIALIZE_QRCODE_SCANNER: 'Dashboard/INITIALIZE_QRCODE_SCANNER',
    UPDATE_USER_LANGUAGE: 'Dashboard/UPDATE_USER_LANGUAGE',
    LOAD_NOTIFICATION: 'Dashboard/LOAD_NOTIFICATION',
    SET_NOTIFICATION: 'Dashboard/SET_NOTIFICATION',
    TOGGLE_LOGOUT_MODAL: 'Dashboard/TOGGLE_LOGOUT_MODAL',
    START_HEADER_QRCODE_SCANNING: 'Dashboard/START_HEADER_QRCODE_SCANNING',
    QRCODE_UPDATE_IN_PROFILE: 'Dashboard/QRCODE_UPDATE_IN_PROFILE',
    CHECK_APP_UPDATE: 'Dashboard/CHECK_APP_UPDATE',
    APP_PLAYSTORE_VERSION_CHECK: 'Dashboard/APP_PLAYSTORE_VERSION_CHECK',
    SET_PLAYSTORE_APP_VERSION_DATA: 'Dashboard/SET_PLAYSTORE_APP_VERSION_DATA',
    DRAWER_STATUS: 'Dashboard/DRAWER_STATUS',
    LOAD_HOME_FEED: 'Dashboard/LOAD_HOME_FEED',
    SET_CHILD_MODE: 'Dashboard/SET_CHILD_MODE',
    USERTYPE_THEME_SWITCH: 'Dashboard/USERTYPE_THEME_SWITCH',
    LOAD_HOME_FEED_API_REQUEST: 'Dashboard/LOAD_HOME_FEED_API_REQUEST',
    LOAD_HOME_FEED_API_SUCCESS: 'Dashboard/LOAD_HOME_FEED_API_SUCCESS',
    LOAD_HOME_FEED_API_FAILED: 'Dashboard/LOAD_HOME_FEED_API_FAILED',
    RESET_HOME_FEED_PAGE: 'Dashboard/RESET_HOME_FEED_PAGE',
    LIKE_POST: 'Dashboard/LIKE_POST',
    POST_LIKE_API_REQUEST: 'Dashboard/POST_LIKE_API_REQUEST',
    POST_LIKE_API_SUCCESS: 'Dashboard/POST_LIKE_API_SUCCESS',
    POST_LIKE_API_FAILED: 'Dashboard/POST_LIKE_API_FAILED',
    RATE_POST: 'Dashboard/RATE_POST',
    RATE_POST_API_REQUEST: 'Dashboard/RATE_POST_API_REQUEST',
    RATE_POST_API_SUCCESS: 'Dashboard/RATE_POST_API_SUCCESS',
    RATE_POST_API_FAILED: 'Dashboard/RATE_POST_API_FAILED',
    SHARE_APP: 'Dashboard/SHARE_APP',
    SHARE_APP_API_REQUEST: 'Dashboard/SHARE_APP_API_REQUEST',
    SHARE_APP_API_SUCCESS: 'Dashboard/SHARE_APP_API_SUCCESS',
    SHARE_APP_API_FAILED: 'Dashboard/SHARE_APP_API_FAILED',
    NOTIFICATION_LIST_API_REQUEST: 'Dashboard/NOTIFICATION_LIST_API_REQUEST',
    NOTIFICATION_LIST_API_SUCCESS: 'Dashboard/NOTIFICATION_LIST_API_SUCCESS',
    NOTIFICATION_LIST_API_FAILED: 'Dashboard/NOTIFICATION_LIST_API_FAILED',
    READ_NOTIFICATION_API_REQUEST: 'Dashboard/READ_NOTIFICATION_API_REQUEST',
    READ_NOTIFICATION_API_SUCCESS: 'Dashboard/READ_NOTIFICATION_API_SUCCESS',
    READ_NOTIFICATION_API_FAILED: 'Dashboard/READ_NOTIFICATION_API_FAILED',
    READ_NOTIFICATION: 'Dashboard/READ_NOTIFICATION',
    SHOW_NOTIFICATION: 'Dashboard/SHOW_NOTIFICATION',
    NOTIFICATIONS: 'Dashboard/NOTIFICATIONS',
    FILTER_UNREAD_NOTIFICATIONS: 'Dashboard/FILTER_UNREAD_NOTIFICATIONS',
    LOAD_TOLLFREE_NUMBERS: 'Dashboard/LOAD_TOLLFREE_NUMBERS',
    SET_TOLLFREE_NUMBERS: 'Dashboard/SET_TOLLFREE_NUMBERS',
    RESET_NOTIFICATION_PAGE: 'Dashboard/RESET_NOTIFICATION_PAGE'
};

export function navigateToDashboardSummary() {
    return navigateWithReset(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.SUMMARY });
}

export function navigateToNotificationView() {
    return navigate(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.NOTIFICATION });
}

export function navigateToQRCodeScannerView() {
    return navigate(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.QRCODESCANNER });
}

export function navigateToTollFreeNumberView() {
    return navigate(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.TOLLFREENUMBER });
}

export function initializeQRCodeScanner(data) {
    return action(types.INITIALIZE_QRCODE_SCANNER, { data });
}

export function updateUserLanguage(data) {
    return action(types.UPDATE_USER_LANGUAGE, { data });
}

export function loadNotification(data) {
    return action(types.LOAD_NOTIFICATION, { data });
}

export function setNotification(data) {
    return action(types.SET_NOTIFICATION, { data });
}

export function toggleLogoutModal(data) {
    return action(types.TOGGLE_LOGOUT_MODAL, { data });
}

export function navigateToCustomerDashboardSummary() {
    return navigateWithReset(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.CUSTOMERSUMMARY });
}

export function navigateToMcfDashboardSummary() {
    return navigateWithReset(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.MCFSUMMARY });
}

export function startHeaderQRCodeScanning(data) {
    return action(types.START_HEADER_QRCODE_SCANNING, { data });
}

export function qrcodeUpdateInProfile(data) {
    return action(types.QRCODE_UPDATE_IN_PROFILE, { data })
}

export function checkAppUpdate(data) {
    return action(types.CHECK_APP_UPDATE, { data });
}

export function appPlayStoreVersionCheck() {
    return action(types.APP_PLAYSTORE_VERSION_CHECK);
}

export function setPlayStoreAppVersionData(data) {
    return action(types.SET_PLAYSTORE_APP_VERSION_DATA, { data });
}

export function drawerStatus(data) {
    return action(types.DRAWER_STATUS, { data });
}

export function loadHomeFeed(data) {
    return action(types.LOAD_HOME_FEED, { data });
}

export function setChildMode(data) {
    return action(types.SET_CHILD_MODE, { data });
}

export function userTypeThemeSelection(data) {
    return action(types.USERTYPE_THEME_SWITCH, { data });
}

export function likePost(data) {
    return action(types.LIKE_POST, { data });
}

export function ratePost(data) {
    return action(types.RATE_POST, { data });
}

export function appShare(data) {
    return action(types.SHARE_APP, { data });
}

export function resetHomeFeedPage() {
    return action(types.RESET_HOME_FEED_PAGE);
}

export function readNotification(data) {
    return action(types.READ_NOTIFICATION, { data });
}

export function showNotification(data) {
    return action(types.SHOW_NOTIFICATION, { data });
}

export function notifications(data) {
    return action(types.NOTIFICATIONS, { data });
}

export function filterUnreadNotifications(data) {
    return action(types.FILTER_UNREAD_NOTIFICATIONS, { data });
}

export function loadTollFreeNumbers(data) {
    return action(types.LOAD_TOLLFREE_NUMBERS, { data });
}

export function setTollFreeNumbers(data) {
    return action(types.SET_TOLLFREE_NUMBERS, { data });
}

export function resetNotificationPage(data) {
    return action(types.RESET_NOTIFICATION_PAGE, { data });
}
