import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { AboutUs } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function DashboardNavigation() {
    return (
        <Navigator headerMode="none">
            <Screen name={ROUTE_KEYS.ABOUTUS} component={AboutUs} />
        </Navigator>
    );
}