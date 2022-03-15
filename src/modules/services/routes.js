import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ROUTE_KEYS } from './constants';
import {
    ServicesTopBar, AllServices, MyServices, ServiceType, Balanidhi
} from './containers';

const { Navigator, Screen } = createStackNavigator();
const ServiceTopTab = createMaterialTopTabNavigator();

export default function ServiceNavigation() {
    return (
        <Navigator headerMode="none">
            <Screen name={ROUTE_KEYS.ALL_SERVICES} component={ServicesTopNavigator} />
            <Screen name={ROUTE_KEYS.SERVICE_TYPE} component={ServiceType} />
            <Screen name={ROUTE_KEYS.BALANIDHI} component={Balanidhi} />
        </Navigator>
    );
}

const ServicesTopNavigator = () => (
    <ServiceTopTab.Navigator
        backBehavior="none"
        swipeEnabled={false}
        tabBar={props => <ServicesTopBar {...props} />}>
        <ServiceTopTab.Screen
            name={ROUTE_KEYS.ALL_SERVICES}
            component={AllServices}
            options={{ index: 0, title: 'all_subscriptions' }}
        />
        <ServiceTopTab.Screen
            name={ROUTE_KEYS.MY_SERVICES}
            component={MyServices}
            options={{ index: 1, title: 'my_subscriptions' }}
        />
    </ServiceTopTab.Navigator>
);

// export { ServicesTopNavigator }