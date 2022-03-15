import { all, takeLatest, delay, put, call, fork, select } from 'redux-saga/effects';
import { saga } from '../../common';
import * as Actions from './actions';
import * as NewsAPI from './api';
import { USER_TYPE_SELECTED_STORE_KEY, USER_TYPE } from '../user/constants';
import { getLanguage } from '../language/selectors';
import Storage from '../../common/storages';

const { types: ActionTypes } = Actions;

function* loadNewsDetails() {
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : null;
    const mode = userType.name === USER_TYPE.CHILD ? true : false;
    const langId = yield select(getLanguage);
    yield fork(saga.handleAPIRequest, NewsAPI.getNewsList, mode, langId.langId);
}

export default function* NewsSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_NEWS_LIST, loadNewsDetails)
    ]);
}
