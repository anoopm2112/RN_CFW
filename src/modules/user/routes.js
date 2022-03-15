import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import {
    Login, ForgotPassword, ResetPassword, ChangePassword, OtpVerification, EditProfile, MyProfile, PassCode,
    UserTypeSelection, SignUp, MobileOtp
} from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function UserNavigation() {
    return (
        <Navigator initialRouteName={ROUTE_KEYS.LOGIN_FORM} headerMode="none">
            <Screen name={ROUTE_KEYS.LOGIN_FORM} component={Login} />
            <Screen name={ROUTE_KEYS.FORGOT_PASSWORD} component={ForgotPassword} />
            <Screen name={ROUTE_KEYS.RESET_PASSWORD} component={ResetPassword} />
            <Screen name={ROUTE_KEYS.CHANGE_PASSWORD} component={ChangePassword} />
            <Screen name={ROUTE_KEYS.OTP_VERIFICATION} component={OtpVerification} />
            <Screen name={ROUTE_KEYS.EDIT_PROFILE} component={EditProfile} />
            <Screen name={ROUTE_KEYS.MY_PROFILE} component={MyProfile} />
            <Screen name={ROUTE_KEYS.PASSCODE} component={PassCode} />
            <Screen name={ROUTE_KEYS.USERTYPE_SELECTION} component={UserTypeSelection} />
            <Screen name={ROUTE_KEYS.SIGN_UP} component={SignUp} />
            <Screen name={ROUTE_KEYS.MOBILE_OTP} component={MobileOtp} />
        </Navigator>
    );
}
