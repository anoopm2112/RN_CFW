import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as NEWS_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate }  } = actions;

export const types = {
    LOAD_NEWS_LIST: 'News/LOAD_NEWS_LIST',
    FETCH_NEWS_LIST_API_REQUEST: 'News/FETCH_NEWS_LIST_API_REQUEST',
    FETCH_NEWS_LIST_API_SUCCESS: 'News/FETCH_NEWS_LIST_API_SUCCESS',
    FETCH_NEWS_LIST_API_FAILED: 'News/FETCH_NEWS_LIST_API_FAILED'
};

export function navigateToNewsScreen() {
    return navigate(MODULE_ROUTE_KEYS.NEWS, { screen: NEWS_ROUTE_KEYS.NEWS_LIST_VIEW })
}

export function navigateToNewsDetailsScreen(data) {
    return navigate(MODULE_ROUTE_KEYS.NEWS, { screen: NEWS_ROUTE_KEYS.NEWS_DETAILS_VIEW, params: { data } })
}

export function loadNewsList(data) {
    return action(types.LOAD_NEWS_LIST, { data })
}
