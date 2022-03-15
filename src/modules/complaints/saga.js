import { all, takeLatest, call, select, take, put, fork } from 'redux-saga/effects';
import Storage from '../../common/storages';
import { I18n, saga, utils } from '../../common';
import * as Actions from './actions';
import * as ComplaintAPI from './api';
import { getUserInfo } from '../user/selectors';
import { USER_TYPE_SELECTED_STORE_KEY, USER_TYPE } from '../user/constants';
import { getLanguage } from '../language/selectors';

const { types: ActionTypes } = Actions;
const { toastUtils: { infoToast, successToast }, userUtils } = utils;

function* loadComplaintList() {
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : null;
    const mode = userType.name === USER_TYPE.CHILD ? true : false;
    const langId = yield select(getLanguage);
    yield fork(saga.handleAPIRequest, ComplaintAPI.complaintList, mode, langId.langId);
}

function* saveNewComplaint(action) {
    yield call(infoToast, I18n.t('complaint_request_updating'));
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : null;
    const mode = userType.name === USER_TYPE.CHILD ? true : false;
    const now = new Date();
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    const { complaintConfigId, location, comment, photo } = action.payload.data;
    const complaintSaveRequest = {
        complaintConfigId,
        location,
        photo,
        comment,
        reportedDate: now
    };
    if (!userUtils.hasChildRole(userInfo)) {
        complaintSaveRequest.childMode = mode;
    }
    yield fork(saga.handleAPIRequest, ComplaintAPI.saveNewComplaint, complaintSaveRequest, userId);
    const complaintRequestAction = yield take([ActionTypes.COMPLAINT_SAVE_API_SUCCESS]);
    if (complaintRequestAction.type === ActionTypes.COMPLAINT_SAVE_API_SUCCESS) {
        yield call(successToast, I18n.t('complaint_added_successfully'));
        yield put(Actions.newComplaintImage(undefined));
        yield put(Actions.newComplaintLocation(undefined));
        yield put(Actions.navigateToComplaintListScreen());
    }
}

export default function* languageSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_COMPLAINT_LIST, loadComplaintList),
        takeLatest(ActionTypes.SAVE_NEW_COMPLAINT, saveNewComplaint)
    ]);
}
