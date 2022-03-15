import { api } from '../../common';
import { types as ActionTypes } from './actions';

const { restAPI } = api;

export function fetchHomeFeed({ homeFeedListData, userId }) {
    let payload = {
        params: homeFeedListData,
        types: [ActionTypes.LOAD_HOME_FEED_API_REQUEST, ActionTypes.LOAD_HOME_FEED_API_SUCCESS, ActionTypes.LOAD_HOME_FEED_API_FAILED]
    };
    return {
        endpoint: `admin/subscription-topics/users/${homeFeedListData.userId}/posts`,
        api: restAPI.get,
        payload,
    };
}

export function setPostLike(userId, postId) {
    let payload = {
        types: [ActionTypes.POST_LIKE_API_REQUEST, ActionTypes.POST_LIKE_API_SUCCESS, ActionTypes.POST_LIKE_API_FAILED]
    };
    return {
        endpoint: `admin/subscription-topics/users/${userId}/posts/${postId}/like`,
        api: restAPI.post,
        payload,
        showErrorToast: false
    };
}

export function setPostRate(userId, postId, starCount) {
    let payload = {
        body: { homePostReaction: starCount },
        types: [ActionTypes.POST_LIKE_API_REQUEST, ActionTypes.POST_LIKE_API_SUCCESS, ActionTypes.POST_LIKE_API_FAILED]
    };
    return {
        endpoint: `admin/subscription-topics/users/${userId}/posts/${postId}/rate`,
        api: restAPI.post,
        payload,
    };
}

export function saveAppShareData(userId, postId, appId) {
    let payload = {
        body: { homePostReaction: appId },
        types: [ActionTypes.SHARE_APP_API_REQUEST, ActionTypes.SHARE_APP_API_SUCCESS, ActionTypes.SHARE_APP_API_FAILED]
    };
    return {
        endpoint: `admin/subscription-topics/users/${userId}/posts/${postId}/share`,
        api: restAPI.post,
        payload,
    };
}

export function fetchNotifications(id, params) {
    let payload = {
        params: params,
        types: [ActionTypes.NOTIFICATION_LIST_API_REQUEST, ActionTypes.NOTIFICATION_LIST_API_SUCCESS, ActionTypes.NOTIFICATION_LIST_API_FAILED]
    };
    return {
        endpoint: `user/users/${id}/notifications`,
        api: restAPI.get,
        payload,
    };
}

export function readNotification(body) {
    let payload = {
        body: body,
        types: [ActionTypes.READ_NOTIFICATION_API_REQUEST, ActionTypes.READ_NOTIFICATION_API_SUCCESS, ActionTypes.READ_NOTIFICATION_API_FAILED]
    };
    return {
        endpoint: `user/notifications`,
        api: restAPI.put,
        payload
    };
}