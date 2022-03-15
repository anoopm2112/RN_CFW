import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as COMPLAINTS_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate } } = actions;

export const types = {
    COMPLAINT_IMAGE: 'Complaints/COMPLAINT_IMAGE',
    COMPLAINT_LOCATION: 'Complaints/COMPLAINT_LOCATION',
    LOAD_COMPLAINT_LIST: 'Complaints/LOAD_COMPLAINT_LIST',
    COMPLAINT_LIST_API_REQUEST: 'Complaints/COMPLAINT_LIST_API_REQUEST',
    COMPLAINT_LIST_API_SUCCESS: 'Complaints/COMPLAINT_LIST_API_SUCCESS',
    COMPLAINT_LIST_API_FAILED: 'Complaints/COMPLAINT_LIST_API_FAILED',
    COMPLAINT_SAVE_API_REQUEST: 'Complaints/COMPLAINT_SAVE_API_REQUEST',
    COMPLAINT_SAVE_API_SUCCESS: 'Complaints/COMPLAINT_SAVE_API_SUCCESS',
    COMPLAINT_SAVE_API_FAILED: 'Complaints/COMPLAINT_SAVE_API_FAILED',
    SAVE_NEW_COMPLAINT: 'Complaints/SAVE_NEW_COMPLAINT'
}

export function navigateToComplaintListScreen() {
    return navigate(MODULE_ROUTE_KEYS.COMPLAINTS, { screen: COMPLAINTS_ROUTE_KEYS.COMPLAINTS_LIST_VIEW })
}

export function navigateToAddComplaint(data) {
    return navigate(MODULE_ROUTE_KEYS.COMPLAINTS, { screen: COMPLAINTS_ROUTE_KEYS.ADD_COMPLAINT_VIEW, params: { data } })
}

export function navigateToComplaintImage(data) {
    return navigate(MODULE_ROUTE_KEYS.COMPLAINTS, { screen: COMPLAINTS_ROUTE_KEYS.COMPLAINT_IMAGE, params: { data } })
}

export function navigateToComplaintLocation() {
    return navigate(MODULE_ROUTE_KEYS.COMPLAINTS, { screen: COMPLAINTS_ROUTE_KEYS.COMPLAINT_LOCATION })
}

export function newComplaintImage(data) {
    return action(types.COMPLAINT_IMAGE, { data });
}

export function newComplaintLocation(data) {
    return action(types.COMPLAINT_LOCATION, { data });
}

export function loadComplaintList() {
    return action(types.LOAD_COMPLAINT_LIST);
}

export function saveNewComplaint(data) {
    return action(types.SAVE_NEW_COMPLAINT, { data });
}
