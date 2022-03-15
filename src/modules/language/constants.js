import BuildConfig from 'react-native-build-config';

export const STATE_REDUCER_KEY = 'language';

const ALL_LANGUAGES = [
    {
        index: 0,
        langId: 1,
        locale: 'en_IN',
        label: 'English',
        lang: 'Language'
    },
    {
        index: 1,
        langId: 2,
        locale: 'ml_IN',
        label: 'മലയാളം',
        lang: 'ഭാഷ'
    }
];

const ALLOWED_LANGUAGES = BuildConfig.LANGUAGES.split(',');

export const LANGUAGES = ALL_LANGUAGES.filter(LANGUAGE => ALLOWED_LANGUAGES.includes(LANGUAGE.locale));

export const LANGUAGE_STORE_KEY = 'language';

export const ROUTE_KEYS = {
    LANGUAGE_SELECT: 'LanguageSelect',
    LANGUAGE_UPDATE: 'LanguageUpdate'
};
