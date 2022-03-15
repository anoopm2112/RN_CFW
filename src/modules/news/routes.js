import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { NewsList, NewsDetails } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function NewsNavigation() {
    return (
        <Navigator headerMode="none">
            <Screen name={ROUTE_KEYS.NEWS_LIST_VIEW} component={NewsList} />
            <Screen name={ROUTE_KEYS.NEWS_DETAILS_VIEW} component={NewsDetails} />
        </Navigator>
    );
}
