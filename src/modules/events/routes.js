import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ROUTE_KEYS } from './constants';
import {
    EventsList, EventsTopBar, MyEventsList, EventDetails
} from './containers';

const { Navigator, Screen } = createStackNavigator();
const EventsTopTab = createMaterialTopTabNavigator();

export default function EventsNavigation() {
    return (
        <Navigator headerMode="none">
            <Screen name={ROUTE_KEYS.EVENTS_LIST_VIEW} component={EventsTopNavigator} />
            <Screen name={ROUTE_KEYS.EVENT_DETAILS_VIEW} component={EventDetails} />
        </Navigator>
    );
}

const EventsTopNavigator = () => (
    <EventsTopTab.Navigator
        swipeEnabled={false}
        tabBar={props => <EventsTopBar {...props} />}>
        <EventsTopTab.Screen
            name={ROUTE_KEYS.EVENTS_LIST_VIEW}
            component={EventsList}
            options={{ index: 0, title: 'all_events' }}
        />
        <EventsTopTab.Screen
            name={ROUTE_KEYS.MY_EVENTS_LIST}
            component={MyEventsList}
            options={{ index: 1, title: 'my_events' }}
        />
    </EventsTopTab.Navigator>
);
export { EventsTopNavigator };