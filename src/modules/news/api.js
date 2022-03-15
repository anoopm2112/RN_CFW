import { api } from '../../common';
import { types as ActionTypes } from './actions';

const { restAPI } = api;

export function getNewsList(mode, langId) {
    let payload = {
        params: { type: 'list', childMode: mode, langId: langId },
        types: [ActionTypes.FETCH_NEWS_LIST_API_REQUEST, ActionTypes.FETCH_NEWS_LIST_API_SUCCESS, ActionTypes.FETCH_NEWS_LIST_API_FAILED]
    };
    return {
        endpoint: 'admin/news',
        api: restAPI.get,
        payload,
    };
}