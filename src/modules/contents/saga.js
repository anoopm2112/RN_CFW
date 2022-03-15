import { all, takeLatest, delay, put, call, fork, select } from 'redux-saga/effects';
import * as Actions from './actions';
import { saga } from '../../common';
import * as ContentAPI from './api';
import { USER_TYPE_SELECTED_STORE_KEY, USER_TYPE } from '../user/constants';
import Storage from '../../common/storages';
import { getLanguage } from '../language/selectors';

const { types: ActionTypes } = Actions;

function* loadContentDetails() {
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : null;
    const mode = userType.name === USER_TYPE.CHILD ? true : false;
    const langId = yield select(getLanguage);
    yield fork(saga.handleAPIRequest, ContentAPI.getContentList, mode, langId.langId);
}

export default function* ContentSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_CONTENT_LIST, loadContentDetails)
    ]);
}
