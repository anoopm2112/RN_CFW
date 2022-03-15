import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as SERVICES_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate } } = actions;

export const types = {
    ALL_SERVICES: 'Services/ALL_SERVICES',
    SET_ALL_SERVICES: 'Services/SET_ALL_SERVICES',
    LOAD_ALL_SERVICE_API_REQUEST: 'Services/LOAD_ALL_SERVICE_API_REQUEST',
    LOAD_ALL_SERVICE_API_SUCCESS: 'Services/LOAD_ALL_SERVICE_API_SUCCESS',
    LOAD_ALL_SERVICE_API_FAILED: 'Services/LOAD_ALL_SERVICE_API_FAILED',
    SUBSCRIBE_SERVICE: 'Services/SUBSCRIBE_SERVICE',
    SUBSCRIBE_SERVICE_API_REQUEST: 'Services/SUBSCRIBE_SERVICE_API_REQUEST',
    SUBSCRIBE_SERVICE_API_SUCCESS: 'Services/SUBSCRIBE_SERVICE_API_SUCCESS',
    SUBSCRIBE_SERVICE_API_FAILED: 'Services/SUBSCRIBE_SERVICE_API_FAILED',
    UNSUBSCRIBE_SERVICE: 'Services/UNSUBSCRIBE_SERVICE',
    UNSUBSCRIBE_SERVICE_API_REQUEST: 'Services/UNSUBSCRIBE_SERVICE_API_REQUEST',
    UNSUBSCRIBE_SERVICE_API_SUCCESS: 'Services/UNSUBSCRIBE_SERVICE_API_SUCCESS',
    UNSUBSCRIBE_SERVICE_API_FAILED: 'Services/UNSUBSCRIBE_SERVICE_API_FAILED',
    LOAD_MY_SERVICE: 'Services/LOAD_MY_SERVICE',
    LOAD_MY_SERVICE_API_REQUEST: 'Services/LOAD_MY_SERVICE_API_REQUEST',
    LOAD_MY_SERVICE_API_SUCCESS: 'Services/LOAD_MY_SERVICE_API_SUCCESS',
    LOAD_MY_SERVICE_API_FAILED: 'Services/LOAD_MY_SERVICE_API_FAILED',
    SHOW_INFO_TOAST: 'Services/SHOW_INFO_TOAST'
}

export function navigateToServicesListScreen() {
    return navigate(MODULE_ROUTE_KEYS.SERVICES, { screen: SERVICES_ROUTE_KEYS.ALL_SERVICES })
}

export function navigateToServiceTypeScreen() {
    return navigate(MODULE_ROUTE_KEYS.SERVICES, { screen: SERVICES_ROUTE_KEYS.SERVICE_TYPE })
}

export function navigateToBalanidhiViewScreen() {
    return navigate(MODULE_ROUTE_KEYS.SERVICES, { screen: SERVICES_ROUTE_KEYS.BALANIDHI })
}

export function getService() {
    return action(types.ALL_SERVICES)
}

export function setAllServices(data) {
    return action(types.SET_ALL_SERVICES, { data })
}

export function subscribeServices(data) {
    return action(types.SUBSCRIBE_SERVICE, { data })
}

export function unSubscribeServices(data) {
    return action(types.UNSUBSCRIBE_SERVICE, { data })
}

export function loadMyService() {
    return action(types.LOAD_MY_SERVICE)
}

export function showInfoToast() {
    return action(types.SHOW_INFO_TOAST)
}

