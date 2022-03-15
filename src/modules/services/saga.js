import { all, takeLatest, take, put, fork, select, call } from 'redux-saga/effects';
import { saga, utils, I18n } from '../../common';
import * as ServiceAPI from './api';
import * as Actions from './actions';
import { getUserInfo } from '../user/selectors';
import { getLanguage } from '../language/selectors';

const { types: ActionTypes } = Actions;
const { toastUtils: { infoToast, successToast } } = utils;

function* getAllServices() {
    const langId = yield select(getLanguage);
    let language = langId.langId;
    yield fork(saga.handleAPIRequest, ServiceAPI.fetchAllServices, language);
    const allServiceSuccessAction = yield take(ActionTypes.LOAD_ALL_SERVICE_API_SUCCESS);
    if (allServiceSuccessAction.type === ActionTypes.LOAD_ALL_SERVICE_API_SUCCESS) {
        yield put(Actions.setAllServices(allServiceSuccessAction.payload.data));
    }
}

function* getMyServices() {
    const userInfo = yield select(getUserInfo);
    const langId = yield select(getLanguage);
    let language = langId.langId;
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, ServiceAPI.fetchMyServices, userId, language);
}

function* handleSubscribeService(action) {
    yield call(infoToast, I18n.t('service_request_updating'), 0);
    const { serviceId, remarks } = action.payload.data;
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, ServiceAPI.subscribeService, serviceId, remarks, userId);
    const subscribeServiceSuccessAction = yield take(ActionTypes.SUBSCRIBE_SERVICE_API_SUCCESS);
    if (subscribeServiceSuccessAction.type === ActionTypes.SUBSCRIBE_SERVICE_API_SUCCESS) {
        yield call(successToast, I18n.t('service_subscribe_successfully'));
        yield put(Actions.getService());
    }
}

function* handleUnSubscribeService(action) {
    yield call(infoToast, I18n.t('service_request_updating'), 0);
    const { serviceId, remarks } = action.payload.data;
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, ServiceAPI.unsubscribeService, serviceId, remarks, userId);
    const unSubscribeServiceSuccessAction = yield take(ActionTypes.UNSUBSCRIBE_SERVICE_API_SUCCESS);
    if (unSubscribeServiceSuccessAction.type === ActionTypes.UNSUBSCRIBE_SERVICE_API_SUCCESS) {
        yield call(successToast, I18n.t('event_unsubscribe_successfully'));
        yield put(Actions.loadMyService());
    }
}

function* showInfoToast() {
    yield call(infoToast, I18n.t('this_feature_is_disabled_on_child_mode'));
}

export default function* ServiceSaga() {
    yield all([
        takeLatest(ActionTypes.ALL_SERVICES, getAllServices),
        takeLatest(ActionTypes.LOAD_MY_SERVICE, getMyServices),
        takeLatest(ActionTypes.SUBSCRIBE_SERVICE, handleSubscribeService),
        takeLatest(ActionTypes.UNSUBSCRIBE_SERVICE, handleUnSubscribeService),
        takeLatest(ActionTypes.SHOW_INFO_TOAST, showInfoToast),
    ]);
}
