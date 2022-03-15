import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getUser = state => state[STATE_REDUCER_KEY];

const userAuthData = user => user.authData;
export const getUserAuthData = flow(getUser, userAuthData);

const userInfo = user => user.info;
export const getUserInfo = flow(getUser, userInfo);

const userRoles = user => user.userRoles;
export const getUserRoles = flow(getUser, userRoles);

const encryptionKey = user => user.encryptionKey;
export const getEncryptionKey = flow(getUser, encryptionKey);

const userType = user => user.userType;
export const getUserType = flow(getUser, userType);

const districtData = user => user.districtData;
export const getDistrictData = flow(getUser, districtData);

const lsgiTypeData = user => user.lsgiTypeData;
export const getLsgiTypeData = flow(getUser, lsgiTypeData);

const channelIds = user => user.channelIds;
export const getChannelIds = flow(getUser, channelIds);