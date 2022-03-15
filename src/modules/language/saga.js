import { all, takeLatest, call, select, spawn, take, put, race } from 'redux-saga/effects';
import Storage from '../../common/storages';
import RNRestart from 'react-native-restart';
import { I18n } from '../../common';
import * as Actions from './actions';
import * as DashBoardActions from '../dashboard/actions';
import * as SplashActions from '../splash/actions';
import { LANGUAGE_STORE_KEY } from './constants';
import { getUserInfo } from '../user/selectors';

const { types: ActionTypes } = Actions;
const { types: DashboardActionTypes } = DashBoardActions;

function* updateLocale(action) {
    const { language, restart, reinitialize } = action.payload.data;
    I18n.locale = language.locale;
    // yield call([Storage, 'setItem'], LANGUAGE_STORE_KEY, JSON.stringify(language));
    // yield put(SplashActions.initialize());
    if (restart) {
        yield call([Storage, 'setItem'], LANGUAGE_STORE_KEY, JSON.stringify(language));
        yield put(SplashActions.initialize());
        // RNRestart.Restart();
    } else if (reinitialize) {
        yield call([Storage, 'setItem'], LANGUAGE_STORE_KEY, JSON.stringify(language));
        // Re-initialize here
        yield put(SplashActions.initialize());
    }
}

export default function* languageSaga() {
    yield all([
        takeLatest(ActionTypes.LANGUAGE_SELECT, updateLocale)
    ]);
}
