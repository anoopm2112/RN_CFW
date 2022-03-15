import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as CHILD_PROTECTION_SYSTEM_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate } } = actions;

export const types = {
    CPS_LOAD_CATEGORY: 'ChildProtectionCategory/CPS_LOAD_CATEGORY',
    LOAD_CATEGORY_DETAILS: 'ChildProtectionCategory/LOAD_CATEGORY_DETAILS'
}

export function navigateToChildProtectionList() {
    return navigate(MODULE_ROUTE_KEYS.CHILD_PROTECTION_SYSTEM, { screen: CHILD_PROTECTION_SYSTEM_ROUTE_KEYS.CHILD_PROTECTION_SYSTEM_LIST })
}

export function navigateToChildProtectionCategoryList(data) {
    return navigate(MODULE_ROUTE_KEYS.CHILD_PROTECTION_SYSTEM, { screen: CHILD_PROTECTION_SYSTEM_ROUTE_KEYS.CHILD_PROTECTION_CATEGORY_LIST, params: { data } })
}

export function navigateToChildProtectionCategoryDetails(data) {
    return navigate(MODULE_ROUTE_KEYS.CHILD_PROTECTION_SYSTEM, { screen: CHILD_PROTECTION_SYSTEM_ROUTE_KEYS.CHILD_PROTECTION_CATEGORY_DETAIL, params: { data } })
}

export function loadChildProtectionCategory(data) {
    return action(types.CPS_LOAD_CATEGORY, { data });
}

export function loadCategoryDetails(data) {
    return action(types.LOAD_CATEGORY_DETAILS, { data });
}