import { all, takeLatest, delay, put, fork, take, call, select } from 'redux-saga/effects';
import { saga, utils, I18n } from '../../common';
import * as Actions from './actions';
import * as EventsAPI from './api';
import { getUserInfo } from '../user/selectors';
import { getLanguage } from '../language/selectors';
import { USER_TYPE_SELECTED_STORE_KEY, USER_TYPE } from '../user/constants';
import Storage from '../../common/storages';

const { toastUtils: { infoToast, successToast } } = utils;

const { types: ActionTypes } = Actions;

function* getUpcomingEvent() {
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : null;
    const mode = userType.name === USER_TYPE.CHILD ? true : false;
    const langId = yield select(getLanguage);
    yield fork(saga.handleAPIRequest, EventsAPI.fetchUpcommingEvents, mode, langId.langId);
    const upcommingEventSuccessAction = yield take(ActionTypes.LOAD_UPCOMMING_EVENTS_API_SUCCESS);
    if (upcommingEventSuccessAction.type === ActionTypes.LOAD_UPCOMMING_EVENTS_API_SUCCESS) {
        yield put(Actions.setUpcomingEvents(upcommingEventSuccessAction.payload.data));
    }
}

function* getMyEvent() {
    let userType = yield call([Storage, 'getItem'], USER_TYPE_SELECTED_STORE_KEY);
    userType = userType ? JSON.parse(userType) : null;
    const mode = userType.name === USER_TYPE.CHILD ? true : false;
    const langId = yield select(getLanguage);
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, EventsAPI.fetchMyEvents, userId, mode, langId.langId);
}

function* handleRegisterEvent(action) {
    yield call(infoToast, I18n.t('event_request_updating'), 0);
    const { eventId, remark } = action.payload.data;
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, EventsAPI.registerEvent, { eventId, userId, remark });
    const registerEventSuccessAction = yield take(ActionTypes.REGISTER_EVENT_API_SUCCESS);
    if (registerEventSuccessAction.type === ActionTypes.REGISTER_EVENT_API_SUCCESS) {
        yield call(successToast, I18n.t('event_register_successfully'));
        yield put(Actions.navigateToEventsListScreen());
    }
}

function* handleCancelRegisterEvent(action) {
    yield call(infoToast, I18n.t('event_request_updating'), 0);
    const { eventId, remark } = action.payload.data;
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, EventsAPI.cancelRegisterEvent, { eventId, userId, remark });
    const cancelRegisterEventSuccessAction = yield take(ActionTypes.CANCEL_EVENT_API_SUCCESS);
    if (cancelRegisterEventSuccessAction.type === ActionTypes.CANCEL_EVENT_API_SUCCESS) {
        yield call(successToast, I18n.t('event_cancel_successfully'));
        yield put(Actions.navigateToEventsListScreen());
    }
}

function* handleEventShare(action) {
    const { eventId, appId } = action.payload.data
    const userInfo = yield select(getUserInfo);
    const { id: userId } = userInfo;
    yield fork(saga.handleAPIRequest, EventsAPI.eventShare, { eventId, userId, appId });
}

function* handleEventDetails(action) {
    const eventId = action.payload.data;
    yield fork(saga.handleAPIRequest, EventsAPI.fetchMyEventsById, eventId);
    const eventSuccessAction = yield take(ActionTypes.EVENTS_BY_ID_API_SUCCESS);
    yield put(Actions.navigateToEventDetails({ data: eventSuccessAction.payload.data, screen: 'upcomingEvents' }));
}

export default function* EventsSaga() {
    yield all([
        takeLatest(ActionTypes.GET_UPCOMING_EVENTS, getUpcomingEvent),
        takeLatest(ActionTypes.LOAD_MY_EVENTS, getMyEvent),
        takeLatest(ActionTypes.REGISTER_EVENT, handleRegisterEvent),
        takeLatest(ActionTypes.CANCEL_EVENT, handleCancelRegisterEvent),
        takeLatest(ActionTypes.EVENTS_SHARE, handleEventShare),
        takeLatest(ActionTypes.EVENTS_BY_ID, handleEventDetails),
    ]);
}
