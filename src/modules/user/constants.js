export const STATE_REDUCER_KEY = 'user';
export const AUTH_DATA_STORE_KEY = 'auth_data';
export const USER_INFO_STORE_KEY = 'user_info';
export const OTP_WAITING_PERIOD = 2; // In minutes
export const USER_TYPE_SELECTED_STORE_KEY = 'user_type_selected_data';
export const USER_FCM_TOKEN = 'user_fcm_token';
export const USER_CHANNEL_IDS = 'user_channel_ids';

export const ROUTE_KEYS = {
    LOGIN_FORM: 'LoginForm',
    FORGOT_PASSWORD: 'ForgotPassword',
    RESET_PASSWORD: 'ResetPassword',
    CHANGE_PASSWORD: 'ChangePassword',
    OTP_VERIFICATION: 'OtpVerification',
    EDIT_PROFILE: 'EditProfile',
    MY_PROFILE: 'MyProfile',
    PASSCODE: 'PassCode',
    USERTYPE_SELECTION: 'UserTypeSelection',
    SIGN_UP: 'SignUp',
    MOBILE_OTP: 'MobileOtp'
};

export const USER_TYPE = {
    CHILD: 'child',
    PARENT: 'parent',
    TEACHER: 'teacher',
    GENERAL_PUBLIC: 'general_public',
    OFFICIAL: 'official'
}
export const ROLE_TYPE = {
    CHILD: 'ROLE_CHILD',
    PARENT: 'ROLE_PARENT',
    TEACHER: 'ROLE_TEACHER',
    GENERAL_PUBLIC: 'ROLE_GENERAL_PUBLIC',
    OFFICIAL: 'ROLE_OFFICIAL'
}

export const COMMON_SIGNUP_LABELS = {
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    DISTRICT: 'district',
    LOCAL_BODY_TYPE: 'local_body_type',
    LOCAL_BODY_NAME: 'local_body_name',
    DOB: 'dob',
    GENDER: 'gender',
    PHONE: 'phone',
    EMAIL: 'email',
    MALE: 'male',
    FEMALE: 'female',
    TRANSGENDER: 'transgender',
    PASSWORD: 'password',
    NEW_PASSWORD: 'new_password',
    CONFIRM_PASSWORD: 'confirm_new_password'
}

export const PARENT_SIGNUP_LABELS = {
    NUM_OF_CHILDRENS: 'no_of_children',
}

export const CHILD_SIGNUP_LABELS = {
    CLASS: 'class',
    SCHOOL_NAME: 'school_name'
}

export const GENDER_DATA = [
    { id: 1, name: COMMON_SIGNUP_LABELS.MALE },
    { id: 2, name: COMMON_SIGNUP_LABELS.FEMALE },
    { id: 3, name: COMMON_SIGNUP_LABELS.TRANSGENDER }
]