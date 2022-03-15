import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MODULE_ROUTE_KEYS } from '../common';
import * as Splash from '../modules/splash';
import * as Language from '../modules/language';
import * as User from '../modules/user';
import * as Dashboard from '../modules/dashboard';
import * as Settings from '../modules/settings';
import * as Permissions from '../modules/permissions';
import * as AboutUs from '../modules/aboutUs';
import * as Events from '../modules/events';
import * as News from '../modules/news';
import * as Contents from '../modules/contents';
import * as Complaints from '../modules/complaints';
import * as Services from '../modules/services';
import * as ChildProtectionSystem from '../modules/childProtectionSystem';

const { Navigator, Screen } = createStackNavigator();

export default function RootNavigation() {
    return (
        <Navigator initialRouteName={MODULE_ROUTE_KEYS.SPLASH} headerMode="none">
            <Screen name={MODULE_ROUTE_KEYS.SPLASH} component={Splash.routes} />
            <Screen name={MODULE_ROUTE_KEYS.LANGUAGE} component={Language.routes} />
            <Screen name={MODULE_ROUTE_KEYS.PERMISSIONS} component={Permissions.routes} />
            <Screen name={MODULE_ROUTE_KEYS.USER} component={User.routes} />
            <Screen name={MODULE_ROUTE_KEYS.DASHBOARD} component={Dashboard.routes} />
            <Screen name={MODULE_ROUTE_KEYS.SETTINGS} component={Settings.routes} />
            <Screen name={MODULE_ROUTE_KEYS.ABOUTUS} component={AboutUs.routes} />
            <Screen name={MODULE_ROUTE_KEYS.EVENTS} component={Events.routes} />
            <Screen name={MODULE_ROUTE_KEYS.NEWS} component={News.routes} />
            <Screen name={MODULE_ROUTE_KEYS.CONTENTS} component={Contents.routes} />
            <Screen name={MODULE_ROUTE_KEYS.COMPLAINTS} component={Complaints.routes} />
            <Screen name={MODULE_ROUTE_KEYS.SERVICES} component={Services.routes} />
            <Screen name={MODULE_ROUTE_KEYS.CHILD_PROTECTION_SYSTEM} component={ChildProtectionSystem.routes} />
        </Navigator>
    );
}
