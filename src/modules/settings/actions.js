import { actions } from '../../common';

const { action } = actions;

const { navigation: { navigate } } = actions;

export const types = {
    SET_DEVELOPER_OPTIONS: 'Settings/SET_DEVELOPER_OPTIONS',
    RESET_DEVELOPER_OPTIONS: 'Settings/RESET_DEVELOPER_OPTIONS',
}

export function navigateTo(route, screen) {
    return navigate(route, { screen });
}

export function setDeveloperOptions(data) {
    return action(types.SET_DEVELOPER_OPTIONS, { data });
}

export function resetDeveloperOptions() {
    return action(types.RESET_DEVELOPER_OPTIONS);
}