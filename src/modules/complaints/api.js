import { api } from '../../common';
import { types as ActionTypes } from './actions';

const { restAPI } = api;

export function complaintList(mode, langId) {
    let payload = {
        params: { childMode: mode, type: 'list', langId: langId },
        types: [ActionTypes.COMPLAINT_LIST_API_REQUEST, ActionTypes.COMPLAINT_LIST_API_SUCCESS, ActionTypes.COMPLAINT_LIST_API_FAILED]
    };
    return {
        endpoint: 'admin/complaint-configs',
        api: restAPI.get,
        payload,
    };
}

export function saveNewComplaint(complaintSaveRequest, userId) {
    let payload = {
        body: complaintSaveRequest,
        types: [ActionTypes.COMPLAINT_SAVE_API_REQUEST, ActionTypes.COMPLAINT_SAVE_API_SUCCESS, ActionTypes.COMPLAINT_SAVE_API_FAILED]
    };
    return {
        endpoint: `admin/complaints/${userId}/new`,
        api: restAPI.post,
        payload,
    };
}