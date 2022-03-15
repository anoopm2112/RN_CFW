import { all, takeLatest, call, select, take, put, fork } from 'redux-saga/effects';
import * as Actions from './actions';
import childProtectionData from './childProtectionData.json';
import { getLanguage } from '../language/selectors';
import { getUserInfo } from '../user/selectors';
import _ from 'lodash';

const { types: ActionTypes } = Actions;

function* loadchildProtectionSystemCategoryList(action) {
    const langId = yield select(getLanguage);
    let language = langId.langId;
    const { id, title } = action.payload.data;
    let categories;
    if (id === 1) {
        categories = childProtectionData.statutory_bodies_for_child_protection.options
    } else if (id === 2) {
        categories = childProtectionData.district_child_protection_unit.options
    } else if (id === 3) {
        categories = childProtectionData.child_care_institution.options
    }
    let childProtectionCategoryListArray = [];
    categories.map((item) => {
        if (language === 1) {
            childProtectionCategoryListArray.push({ 'id': item.cps_id, 'label': item.label.en_IN, 'desc': item.desc.en_IN, 'icon': item.icon, 'address': item.address && item.address.en_IN });
        } else if (language === 2) {
            childProtectionCategoryListArray.push({ 'id': item.cps_id, 'label': item.label.ml_IN, 'desc': item.desc.ml_IN, 'icon': item.icon, 'address': item.address && item.address.ml_IN });
        }
    });
    if (id === 2) {
        yield put(Actions.loadCategoryDetails(childProtectionCategoryListArray[0]));
    } else {
        yield put(Actions.navigateToChildProtectionCategoryList({ data: childProtectionCategoryListArray, headerTitle: title }));
    }
}

function* handleLoadCategoryDetails(action) {
    const { id, label, desc } = action.payload.data;
    const userInfo = yield select(getUserInfo);
    const { district } = userInfo;
    const langId = yield select(getLanguage);
    let language = langId.langId;
    const getDistrictCategory = _.filter(childProtectionData.address.options, { 'district_id': district.id });
    const getCategoryItem = getDistrictCategory.length > 0 ? _.filter(getDistrictCategory[0].category, { 'cat_id': action.payload.data.id }) : [];
    let childProtectionCategoryListObj = { 'label': label, 'desc': desc };
    getCategoryItem.map((item) => {
        if (language === 1) {
            childProtectionCategoryListObj.id = item.cat_id
            childProtectionCategoryListObj.address = item.address && item.address.en_IN
            childProtectionCategoryListObj.phoneNumber = item.phoneNumber && item.phoneNumber,
                childProtectionCategoryListObj.location = item.location
        } else if (language === 2) {
            childProtectionCategoryListObj.id = item.cat_id
            childProtectionCategoryListObj.address = item.address && item.address.ml_IN
            childProtectionCategoryListObj.phoneNumber = item.phoneNumber && item.phoneNumber,
                childProtectionCategoryListObj.location = item.location
        }
    });
    yield put(Actions.navigateToChildProtectionCategoryDetails({ data: childProtectionCategoryListObj }));
}

export default function* childProtectionSystemSaga() {
    yield all([
        takeLatest(ActionTypes.CPS_LOAD_CATEGORY, loadchildProtectionSystemCategoryList),
        takeLatest(ActionTypes.LOAD_CATEGORY_DETAILS, handleLoadCategoryDetails),
    ]);
}
