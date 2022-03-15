import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { PermissionGrant } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function LanguageSelectNavigation() {
    return (
        <Navigator initialRouteName={ROUTE_KEYS.PERMISSION_GRANT} headerMode="none">
            <Screen name={ROUTE_KEYS.PERMISSION_GRANT} component={PermissionGrant} />
        </Navigator>
    );
}
