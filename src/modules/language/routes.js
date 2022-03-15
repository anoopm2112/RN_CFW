import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { LanguageSelect, UpdateLanguageSelect } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function LanguageSelectNavigation() {
    return (
        <Navigator initialRouteName={ROUTE_KEYS.LANGUAGE_SELECT} headerMode='none'>
            <Screen name={ROUTE_KEYS.LANGUAGE_SELECT} component={LanguageSelect} />
            <Screen name={ROUTE_KEYS.LANGUAGE_UPDATE} component={UpdateLanguageSelect} />
        </Navigator>
    );
}
