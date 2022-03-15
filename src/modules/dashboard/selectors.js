import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getDashboard = state => state[STATE_REDUCER_KEY];

const sideBar = dashboard => dashboard.sideBar;
export const getSideBarData = flow(getDashboard, sideBar);

const qrcode = dashboard => dashboard.qrcode;
export const getQRCode = flow(getDashboard, qrcode);

const notification = dashboard => dashboard.notification;
export const getNotification = flow(getDashboard, notification);

const playstoreAppData = dashboard => dashboard.playstoreAppData;
export const getPlaystoreAppData = flow(getDashboard, playstoreAppData);

const needsUpdate = dashboard => dashboard.needsUpdate;
export const getNeedsUpdate = flow(getDashboard, needsUpdate);

const homeFeed = dashboard => dashboard.homeFeed;
export const getHomeFeed = flow(getDashboard, homeFeed);

const pushNotifications = dashboard => dashboard.pushNotifications;
export const getPushNotifications = flow(getDashboard, pushNotifications);

const tollFreeNumber = dashboard => dashboard.tollFreeNumber;
export const getTollFreeNumber = flow(getDashboard, tollFreeNumber);
