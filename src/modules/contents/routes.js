import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { ContentsList, ContentDetails } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function ContentsNavigation() {
    return (
        <Navigator headerMode="none">
            <Screen name={ROUTE_KEYS.CONTENTS_LIST_VIEW} component={ContentsList} />
            <Screen name={ROUTE_KEYS.CONTENTS_DETAILS_VIEW} component={ContentDetails} />
        </Navigator>
    );
}