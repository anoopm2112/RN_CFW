import { api } from '../../common';
import { types as ActionTypes } from './actions';

const { restAPI } = api;

export function fetchAllServices(language) {
    let payload = {
        params: { type: 'list', langId: language },
        types: [ActionTypes.LOAD_ALL_SERVICE_API_REQUEST, ActionTypes.LOAD_ALL_SERVICE_API_SUCCESS, ActionTypes.LOAD_ALL_SERVICE_API_FAILED]
    };
    return {
        endpoint: 'admin/subscription-topics',
        api: restAPI.get,
        payload,
    };
}

export function fetchMyServices(userId, language) {
    let payload = {
        params: { type: 'list', langId: language },
        types: [ActionTypes.LOAD_MY_SERVICE_API_REQUEST, ActionTypes.LOAD_MY_SERVICE_API_SUCCESS, ActionTypes.LOAD_MY_SERVICE_API_FAILED]
    };
    return {
        endpoint: `admin/subscription-topics/users/${userId}`,
        api: restAPI.get,
        payload,
    };
}

export function subscribeService(serviceId, remarks, userId) {
    let payload = {
        body: { remark: remarks },
        types: [ActionTypes.SUBSCRIBE_SERVICE_API_REQUEST, ActionTypes.SUBSCRIBE_SERVICE_API_SUCCESS, ActionTypes.SUBSCRIBE_SERVICE_API_FAILED]
    };
    return {
        endpoint: `admin/subscription-topics/${serviceId}/users/${userId}?action=subscribe`,
        api: restAPI.post,
        payload,
    };
}

export function unsubscribeService(serviceId, remarks, userId) {
    let payload = {
        body: { remark: remarks },
        types: [ActionTypes.UNSUBSCRIBE_SERVICE_API_REQUEST, ActionTypes.UNSUBSCRIBE_SERVICE_API_SUCCESS, ActionTypes.UNSUBSCRIBE_SERVICE_API_FAILED]
    };
    return {
        endpoint: `admin/subscription-topics/${serviceId}/users/${userId}?action=unsubscribe`,
        api: restAPI.post,
        payload,
    };
}
