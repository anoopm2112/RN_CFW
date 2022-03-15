import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as CONTENTS_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate } } = actions;

export const types = {
    LOAD_CONTENT_LIST: 'Content/LOAD_CONTENT_LIST',
    FETCH_CONTENT_LIST_API_REQUEST: 'News/FETCH_CONTENT_LIST_API_REQUEST',
    FETCH_CONTENT_LIST_API_SUCCESS: 'News/FETCH_CONTENT_LIST_API_SUCCESS',
    FETCH_CONTENT_LIST_API_FAILED: 'News/FETCH_CONTENT_LIST_API_FAILED'
};

export function navigateToContentScreen() {
    return navigate(MODULE_ROUTE_KEYS.CONTENTS, { screen: CONTENTS_ROUTE_KEYS.CONTENTS_LIST_VIEW })
}

export function navigateToContentDetailsScreen(data) {
    return navigate(MODULE_ROUTE_KEYS.CONTENTS, { screen: CONTENTS_ROUTE_KEYS.CONTENTS_DETAILS_VIEW, params: { data } })
}

export function loadContentList(data) {
    return action(types.LOAD_CONTENT_LIST, { data })
}