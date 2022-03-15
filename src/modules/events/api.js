import { api } from '../../common';
import { types as ActionTypes } from './actions';

const { restAPI } = api;

export function fetchUpcommingEvents(mode, langId) {
    let payload = {
        params: { type: 'list', childMode: mode, langId: langId },
        types: [ActionTypes.LOAD_UPCOMMING_EVENTS_API_REQUEST, ActionTypes.LOAD_UPCOMMING_EVENTS_API_SUCCESS, ActionTypes.LOAD_UPCOMMING_EVENTS_API_FAILED]
    };
    return {
        endpoint: 'admin/events',
        api: restAPI.get,
        payload,
    };
}

export function fetchMyEvents(userId, mode, langId) {
    let payload = {
        params: { type: 'list', childMode: mode, langId: langId },
        types: [ActionTypes.LOAD_MY_EVENTS_API_REQUEST, ActionTypes.LOAD_MY_EVENTS_API_SUCCESS, ActionTypes.LOAD_MY_EVENTS_API_FAILED]
    };
    return {
        endpoint: `admin/events/${userId}/my-events`,
        api: restAPI.get,
        payload,
    };
}

export function registerEvent({ eventId, userId, remark }) {
    let payload = {
        body: { remarks: remark },
        types: [ActionTypes.REGISTER_EVENT_API_REQUEST, ActionTypes.REGISTER_EVENT_API_SUCCESS, ActionTypes.REGISTER_EVENT_API_FAILED]
    };
    return {
        endpoint: `admin/events/${eventId}/user/${userId}/register`,
        api: restAPI.post,
        payload,
    };
}

export function cancelRegisterEvent({ eventId, userId, remark }) {
    let payload = {
        body: { remarks: remark },
        types: [ActionTypes.CANCEL_EVENT_API_REQUEST, ActionTypes.CANCEL_EVENT_API_SUCCESS, ActionTypes.CANCEL_EVENT_API_FAILED]
    };
    return {
        endpoint: `admin/events/${eventId}/user/${userId}/cancel`,
        api: restAPI.del,
        payload,
    };
}

export function eventShare({ eventId, userId, appId }) {
    let payload = {
        body: { eventReaction: appId },
        types: [ActionTypes.EVENTS_SHARE_API_REQUEST, ActionTypes.EVENTS_SHARE_API_SUCCESS, ActionTypes.EVENTS_SHARE_API_FAILED]
    };
    return {
        endpoint: `admin/events/users/${userId}/event/${eventId}/share`,
        api: restAPI.post,
        payload,
    };
}


export function fetchMyEventsById(eventId) {
    let payload = {
        params: { type: 'mobile' },
        types: [ActionTypes.EVENTS_BY_ID_API_REQUEST, ActionTypes.EVENTS_BY_ID_API_SUCCESS, ActionTypes.EVENTS_BY_ID_API_FAILED]
    };
    return {
        endpoint: `admin/events/${eventId}`,
        api: restAPI.get,
        payload,
    };
}