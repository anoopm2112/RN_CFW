import { all, takeLatest, select, spawn } from 'redux-saga/effects';
import Storage from '../../common/storages';
import _ from 'lodash';
import { DEVELOPER_OPTIONS_STORE_KEY } from '../settings/constants';
import { getDeveloperOptions } from '../settings/selectors';
import * as Actions from './actions';

const { types: ActionTypes } = Actions;

function* setDeveloperOptions(action) {
    const developerOptions = _.cloneDeep((yield select(getDeveloperOptions)));
    _.merge(developerOptions, action.payload.data);
    yield spawn([Storage, 'setItem'], DEVELOPER_OPTIONS_STORE_KEY, JSON.stringify(developerOptions));
}

export default function* settingsSaga() {
    yield all([
        takeLatest(ActionTypes.SET_DEVELOPER_OPTIONS, setDeveloperOptions),
    ]);
}
