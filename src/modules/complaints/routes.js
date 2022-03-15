import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { ComplaintsList, AddComplaint, ComplaintImage, ComplaintLocation } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function NewsNavigation() {
    return (
        <Navigator headerMode="none">
            <Screen name={ROUTE_KEYS.COMPLAINTS_LIST_VIEW} component={ComplaintsList} />
            <Screen name={ROUTE_KEYS.ADD_COMPLAINT_VIEW} component={AddComplaint} />
            <Screen name={ROUTE_KEYS.COMPLAINT_IMAGE} component={ComplaintImage} />
            <Screen name={ROUTE_KEYS.COMPLAINT_LOCATION} component={ComplaintLocation} />
        </Navigator>
    );
}
