import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { ChildProtectionSystemList, ChildProtectionCategoryList, ChildProtectionCategoryDetail } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function ChildProtectionSystemNavigation() {
    return (
        <Navigator headerMode="none">
            <Screen name={ROUTE_KEYS.CHILD_PROTECTION_SYSTEM_LIST} component={ChildProtectionSystemList} />
            <Screen name={ROUTE_KEYS.CHILD_PROTECTION_CATEGORY_LIST} component={ChildProtectionCategoryList} />
            <Screen name={ROUTE_KEYS.CHILD_PROTECTION_CATEGORY_DETAIL} component={ChildProtectionCategoryDetail} />
        </Navigator>
    );
}