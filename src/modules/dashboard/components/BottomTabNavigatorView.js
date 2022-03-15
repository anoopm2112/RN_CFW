import React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { components, utils } from '../../../common';
import { convertWidth } from '../../../common/utils/dimensionUtil';

const { BottomNavigation, BottomNavigationTab, Divider, Text } = components;
const { dimensionUtils: { convertHeight } } = utils;

const BottomTabNavigatorView = ({ ...props }) => {

    const theme = useTheme();

    const onTabSelect = (index) => {
        const selectedTabRoute = props.state.routeNames[index];
        props.navigation.navigate(selectedTabRoute);
    };

    const createNavigationTabForRoute = (route, index) => {
        const { options } = props.descriptors[route.key];
        return (
            <BottomNavigationTab
                key={route.key}
                icon={index === options.index ? options.tabBarIcon1 : options.tabBarIcon2}
                title={props => (
                    <Text category="h1" {...props}
                        style={[props.style, {
                            fontSize: convertWidth(12), marginBottom: convertWidth(10),
                            color: index === options.index ?
                                theme['color-basic-1003'] :
                                theme['color-basic-1004']
                        }]}>
                        {options.title}
                    </Text>)}
            />
        );
    };

    return (
        <SafeAreaView>
            <BottomNavigation appearance='noIndicator' style={{ backgroundColor: theme['color-basic-700'], height: convertHeight(40) }} selectedIndex={props.state.index} onSelect={onTabSelect}>
                {props.state.routes.map((route) => createNavigationTabForRoute(route, props.state.index))}
            </BottomNavigation>
        </SafeAreaView>
    );
}

export default BottomTabNavigatorView;