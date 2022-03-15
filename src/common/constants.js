import { Platform } from 'react-native';
import RNConfigReader from 'rn-config-reader';

export const API_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss[Z]';

export const API_TIME_FORMAT = 'HH:mm:ss.SSS';

export const DATE_TIME_FORMAT = 'DD/MM/YYYY hh:mm A';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const TIME_FORMAT = 'hh:mm A';

export const AUTH_SERVER_ENDPOINT = "auth/realms/cfw/protocol/openid-connect/token";

export const CLIENT_ID = "mobile-app";

export const ERROR_CODES = {
    JWT_EXPIRED: 4401
};

export const RESOURCE_MAPPING = {
};
export const ACTION_MAPPING = {
};

export const VALIDATION_RULES = {
    PHONE_REG_EXP: /^[6-9]\d{9}$/,
    DIGIT_REG_EXP: /^\d+$/,
    DECIMAL_REG_EXP: /^[0-9]*\.[0-9]+/,
    DIGIT_OR_DECIMAL_REG_EXP: /^[0-9]*(\.[0-9]+)?$/,
    EMAIL_REG_EXP: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    YOUTUBE_REG_EXP: /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
}

export const ROLE_TYPES = {
    ROLE_CHILD: 'ROLE_CHILD'
};

export const PERMISSIONS_REQUIRED = Platform.OS === 'android' ? [
    // PermissionsAndroid.PERMISSIONS.CAMERA,
    // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    // PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    // PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    // PermissionsAndroid.PERMISSIONS.CALL_PHONE
] : Platform.OS === 'ios' ? [
    // PERMISSIONS.IOS.CAMERA,
    // PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    // PERMISSIONS.IOS.CONTACTS,
] : [];

export const LANGUAGES = [
    {
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobre', 'Novembre', 'Decembre'],
        monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'May', 'Ju', 'Jul.', 'Aug', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
        dayNames: ['Monday', 'Tuesday', 'Wenesday', 'Thursday', 'Friday', 'Satuday', 'Sunday'],
        dayNamesShort: ['Mon.', 'Tue.', 'Wen.', 'Thu.', 'Fri.', 'Sat.', 'San.'],
        today: 'Today',
        locale: 'en_IN'
    },
    {
        monthNames: ['ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മെയ്', 'ജൂൺ', 'ജൂലൈ', 'ഓഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്ടോബർ', 'നവംബർ', 'ഡിസംബർ'],
        monthNamesShort: ['ജനു.', 'ഫെബ്രു.', 'മാർ', 'ഏപ്രി', 'മെയ്', 'ജൂൺ', 'ജൂലൈ.', 'ഓഗ.', 'സെപ്റ്റം.', 'ഒക്ടോ.', 'നവം.', 'ഡിസം.'],
        dayNames: ['തിങ്കളാഴ്ച', 'ചൊവ്വാഴ്ച', 'ബുധനാഴ്ച', 'വ്യാഴാഴ്ച', 'വെള്ളിയാഴ്ച', 'ശനിയാഴ്ച', 'ഞായറാഴ്ച',],
        dayNamesShort: ['തിങ്ക.', 'ചൊവ', 'ബുധ.', 'വ്യാഴ.', 'വെള്ളി.', 'ശനി.', 'ഞായ.',],
        today: 'ഇന്ന്',
        locale: 'ml_IN'
    }
];

export const COLOR_SCHEME = {
    BLUE_LIGHT: 'blue-light',
    BLACK_LIGHT: 'black-light'
};

export const API_PROVIDER_TYPE = {
    NOTIFICATION: 'Notification'
};

export const SHARE_ITEMS = {
    APP_LINK: RNConfigReader.app_play_store_link
}

export const SOCIAL_APP_ID = {
    FACEBOOK: 1,
    WHATSAPP: 2,
    INSTAGRAM: 3,
    LINKEDIN: 4,
    TWITTER: 5
}

export const NOTIFICATIONS = {
    EVENT_NOTIFICATION: 'EVENT_NOTIFICATION',
};