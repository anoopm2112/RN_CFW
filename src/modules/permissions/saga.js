import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as Actions from './actions';
import * as SplashActions from '../splash/actions';
import { PERMISSION_CHECK_STORE_KEY } from './constants';
import Storage from '../../common/storages';

const { types: ActionTypes } = Actions;

function* grantPermissions() {
    yield call([Storage, 'setItem'], PERMISSION_CHECK_STORE_KEY, 'permissionChecked');
    let allPermissionsGranted = true;
    if (allPermissionsGranted) {
        // Re-initialize here
        yield put(SplashActions.initialize());
    }
}

function* denyPermissions() {
    yield put(Actions.showGrantPermissionsModal(true));
}

export default function* permissionSaga() {
    yield all([
        takeLatest(ActionTypes.GRANT_PERMISSIONS, grantPermissions),
        takeLatest(ActionTypes.DENY_PERMISSIONS, denyPermissions)
    ]);
}
