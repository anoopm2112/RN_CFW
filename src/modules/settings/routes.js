import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTE_KEYS } from './constants';
import { Settings, DeveloperOptions } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function DashboardNavigation() {
    return (
        <Navigator headerMode="none">
            <Screen name={ROUTE_KEYS.SETTINGS} component={Settings} />
            <Screen name={ROUTE_KEYS.DEVELOPER_OPTIONS} component={DeveloperOptions} />
        </Navigator>
    );
}
