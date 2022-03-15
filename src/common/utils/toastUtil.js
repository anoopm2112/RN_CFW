import Toast from 'react-native-toast-message';

const DEFAULT_TOAST_TIMEOUT = 1000;

export const infoToast = (title = 'Performing operation', timeout = DEFAULT_TOAST_TIMEOUT) => {
    showToast('info', title, timeout);
}

export const successToast = (title = 'Success', timeout = DEFAULT_TOAST_TIMEOUT) => {
    showToast('success', title, timeout);
}

export const errorToast = (title = 'Error', timeout = DEFAULT_TOAST_TIMEOUT) => {
    showToast('error', title, timeout);
}

export const hideToast = () => {
    Toast.hide();
}

const showToast = (type, title, timeout) => {
    Toast.hide();
    Toast.show({
        type,
        text1: title.replace(/([^.])$/, '$1.'),
        autoHide: timeout === 0 ? false : true,
        visibilityTime: timeout
    });
}
