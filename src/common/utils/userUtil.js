import { ROLE_TYPES, MODULES } from '../constants';

export function getUserId(user = {}) {
    return user.info ? user.info.id : '';
}

export function getFullName(user = {}) {
    if (user.info) {
        const firstName = user.info.firstName ? ' ' + user.info.firstName : '';
        const middleName = user.info.middleName ? ' ' + user.info.middleName : '';
        const lastName = user.info.lastName ? ' ' + user.info.lastName : '';
        return `${firstName}${middleName} ${lastName}`;
    }
    return '';
}

export function hasDeveloperRole(userInfo = {}) {
    if (userInfo.roles) {
        return userInfo.roles.some(role => role.key === ROLE_TYPES.ROLE_DEVELOPER);
    }
}

export function hasAnyRole(userInfo = {}, roles = []) {
    if (userInfo.roles) {
        return userInfo.roles.some(role => roles.includes(role.key));
    }
}

export function hasChildRole(userInfo = {}) {
    if (userInfo.roles) {
        return userInfo.roles.some(role => role.key === ROLE_TYPES.ROLE_CHILD);
    }
}