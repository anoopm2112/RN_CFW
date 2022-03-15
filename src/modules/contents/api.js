import { api } from '../../common';
import { types as ActionTypes } from './actions';

const { restAPI } = api;

export function getContentList(mode, langId) {
    let payload = {
        params: { type: 'list', childMode: mode, langId: langId },
        types: [ActionTypes.FETCH_CONTENT_LIST_API_REQUEST, ActionTypes.FETCH_CONTENT_LIST_API_SUCCESS, ActionTypes.FETCH_CONTENT_LIST_API_FAILED]
    };
    return {
        endpoint: 'admin/content-details',
        api: restAPI.get,
        payload,
    };
}