import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as EVENTS_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate } } = actions;

export const types = {
    GET_UPCOMING_EVENTS: 'Events/GET_UPCOMING_EVENTS',
    SET_UPCOMING_EVENTS: 'Events/SET_UPCOMING_EVENTS',
    LOAD_UPCOMMING_EVENTS_API_REQUEST: 'Events/LOAD_UPCOMMING_EVENTS_API_REQUEST',
    LOAD_UPCOMMING_EVENTS_API_SUCCESS: 'Events/LOAD_UPCOMMING_EVENTS_API_SUCCESS',
    LOAD_UPCOMMING_EVENTS_API_FAILED: 'Events/LOAD_UPCOMMING_EVENTS_API_FAILED',
    REGISTER_EVENT: 'Events/REGISTER_EVENT',
    REGISTER_EVENT_API_REQUEST: 'Events/REGISTER_EVENT_API_REQUEST',
    REGISTER_EVENT_API_SUCCESS: 'Events/REGISTER_EVENT_API_SUCCESS',
    REGISTER_EVENT_API_FAILED: 'Events/REGISTER_EVENT_API_FAILED',
    CANCEL_EVENT: 'Events/CANCEL_EVENT',
    CANCEL_EVENT_API_REQUEST: 'Events/CANCEL_EVENT_API_REQUEST',
    CANCEL_EVENT_API_SUCCESS: 'Events/CANCEL_EVENT_API_SUCCESS',
    CANCEL_EVENT_API_FAILED: 'Events/CANCEL_EVENT_API_FAILED',
    LOAD_MY_EVENTS: 'Events/LOAD_MY_EVENTS',
    LOAD_MY_EVENTS_API_REQUEST: 'Events/LOAD_MY_EVENTS_API_REQUEST',
    LOAD_MY_EVENTS_API_SUCCESS: 'Events/LOAD_MY_EVENTS_API_SUCCESS',
    LOAD_MY_EVENTS_API_FAILED: 'Events/LOAD_MY_EVENTS_API_FAILED',
    EVENTS_SHARE: 'Events/EVENTS_SHARE',
    EVENTS_SHARE_API_REQUEST: 'Events/EVENTS_SHARE_API_REQUEST',
    EVENTS_SHARE_API_SUCCESS: 'Events/EVENTS_SHARE_API_SUCCESS',
    EVENTS_SHARE_API_FAILED: 'Events/EVENTS_SHARE_API_FAILED',
    EVENTS_BY_ID_API_REQUEST: 'Events/EVENTS_BY_ID_API_REQUEST',
    EVENTS_BY_ID_API_SUCCESS: 'EVENTS_BY_ID_API_SUCCESS',
    EVENTS_BY_ID_API_FAILED: 'Events/EVENTS_BY_ID_API_FAILED',
    EVENTS_BY_ID: 'Events/EVENTS_BY_ID'
}

export function navigateToEventDetails(data) {
    return navigate(MODULE_ROUTE_KEYS.EVENTS, { screen: EVENTS_ROUTE_KEYS.EVENT_DETAILS_VIEW, params: { data } })
}

export function navigateToEventsListScreen() {
    return navigate(MODULE_ROUTE_KEYS.EVENTS, { screen: EVENTS_ROUTE_KEYS.EVENTS_LIST_VIEW })
}

export function getUpcomingEvents() {
    return action(types.GET_UPCOMING_EVENTS)
}

export function setUpcomingEvents(data) {
    return action(types.SET_UPCOMING_EVENTS, { data })
}

export function registerEvent(data) {
    return action(types.REGISTER_EVENT, { data });
}

export function cancelRegisterEvent(data) {
    return action(types.CANCEL_EVENT, { data });
}

export function loadMyEvents() {
    return action(types.LOAD_MY_EVENTS);
}

export function eventShare(data) {
    return action(types.EVENTS_SHARE, { data });
}

export function eventById(data) {
    return action(types.EVENTS_BY_ID, { data });
}