import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@ui-kitten/components';
import { components, I18n, utils } from '../../common';
import { ROUTE_KEYS } from './constants';
import { ROUTE_KEYS as SERVICE_ROUTE_KEYS } from '../services/constants';
import { ROUTE_KEYS as COMPLAINTS_ROUTE_KEYS } from '../complaints/constants';
import { Summary, Notification, SideBar, BottomTabNavigator, DashboardQRCodeScanner, CustomerSummary, TollFreeNumber } from './containers';

import { ContentsList } from '../contents/containers';
import { ComplaintsList } from '../complaints/containers';
import { ServiceType } from '../services/containers';
const { FontelloIcon } = components;
const { dimensionUtils: { convertHeight, convertWidth } } = utils;

const { Navigator, Screen } = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

export default function DashboardNavigation() {
    const [initRender, setInitRender] = React.useState(true);

    React.useEffect(() => {
        setInitRender(false); // Fix to blink issue on load page
    }, [initRender]);

    return (
        <Navigator
            drawerContent={props => <SideBar {...props} />}
            drawerStyle={{ width: initRender ? null : '85%' }}
            headerMode="none"
            screenOptions={{ gestureEnabled: true }}>
            <Screen name={ROUTE_KEYS.DASHBOARDBOTTOMBAR} component={DashboardBottomNavigator} />
            <Screen name={ROUTE_KEYS.CUSTOMERSUMMARY} component={CustomerSummary} />
            <Screen name={ROUTE_KEYS.NOTIFICATION} component={Notification} />
            <Screen name={ROUTE_KEYS.QRCODESCANNER} component={DashboardQRCodeScanner} />
            <Screen name={ROUTE_KEYS.TOLLFREENUMBER} component={TollFreeNumber} />
        </Navigator>
    );
}

const DashboardBottomNavigator = () => {
    const theme = useTheme();

    const HomeIconSelect = () => <FontelloIcon name="home-icon" size={convertHeight(13)} color={theme['color-basic-1003']} />
    const HomeIconUnselect = () => <FontelloIcon name="home-icon" size={convertHeight(13)} color={theme['color-basic-1004']} />

    const ContentsIconSelect = () => <FontelloIcon name="contents-icon" size={convertHeight(13)} color={theme['color-basic-1003']} />
    const ContentsIconUnselect = () => <FontelloIcon name="contents-icon" size={convertHeight(13)} color={theme['color-basic-1004']} />

    const ServiceIconSelect = () => <FontelloIcon name="service-plus" size={convertHeight(13)} color={theme['color-basic-1003']} />
    const ServiceIconUnselect = () => <FontelloIcon name="service-plus" size={convertHeight(13)} color={theme['color-basic-1004']} />

    const ComplaintsIconSelect = () => <FontelloIcon name="complaint-plus" size={convertHeight(13)} color={theme['color-basic-1003']} />
    const ComplaintsIconUnselect = () => <FontelloIcon name="complaint-plus" size={convertHeight(13)} color={theme['color-basic-1004']} />

    return (
        <BottomTab.Navigator tabBar={props => <BottomTabNavigator {...props} />}>
            <BottomTab.Screen
                name={ROUTE_KEYS.SUMMARY}
                component={Summary}
                options={{ index: 0, title: I18n.t('home'), tabBarIcon1: HomeIconSelect, tabBarIcon2: HomeIconUnselect }}
            />
            <BottomTab.Screen
                name={ROUTE_KEYS.QRCODESCANNER}
                component={ContentsList}
                options={{ index: 1, title: I18n.t('contents'), tabBarIcon1: ContentsIconSelect, tabBarIcon2: ContentsIconUnselect }}
            />
            <BottomTab.Screen
                name={SERVICE_ROUTE_KEYS.SERVICE_TYPE}
                component={ServiceType}
                options={{ index: 2, title: I18n.t('service'), tabBarIcon1: ServiceIconSelect, tabBarIcon2: ServiceIconUnselect }}
            />
            <BottomTab.Screen
                name={COMPLAINTS_ROUTE_KEYS.COMPLAINTS_LIST_VIEW}
                component={ComplaintsList}
                options={{ index: 3, title: I18n.t('complaints'), tabBarIcon1: ComplaintsIconSelect, tabBarIcon2: ComplaintsIconUnselect }}
            />
        </BottomTab.Navigator>
    );
}