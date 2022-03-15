import React, { useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { components, I18n, utils } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { convertWidth } from '../../../common/utils/dimensionUtil';

const { dimensionUtils: { convertHeight } } = utils;
const { Divider, TabBar, Tab, Text, Header } = components

const EventsTopBarView = ({ user, ...props }) => {
    const { navigation } = props;
    const onTabSelect = (index) => {
        const selectedTabRoute = props.state.routeNames[index];
        props.navigation.navigate(selectedTabRoute);
    };

    useEffect(() => {
        function handleBackButton() {
            props.navigateToDashboardSummary();
            return true;
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            backHandler.remove();
        }
    }, []);

    const createNavigationTabForRoute = (route, i) => {
        const { options } = props.descriptors[route.key];
        return (
            <Tab
                key={route.key}
                title={props => (
                    <View style={[Styles.tabView, {
                        backgroundColor: i === options.index ? theme['color-basic-1000'] : theme['color-basic-1010']
                    }]}>
                        <Text
                            numberOfLines={1} category="h1" {...props}
                            style={[props.style, {fontSize:convertWidth(14), color: i === options.index ? theme['color-basic-100'] : theme['color-basic-1000'] }]}>
                            {I18n.t(options.title)}
                        </Text>
                    </View>)}
            />
        );
    };

    const theme = useTheme();

    const Styles = StyleSheet.create({
        tabBarStyle: {
            backgroundColor: theme['color-basic-1008'],
            paddingVertical: convertHeight(10)
        },
        tabView: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: convertWidth(15),
            paddingVertical: convertHeight(7),
            marginHorizontal: convertWidth(10),
            paddingHorizontal: convertWidth(10)
        }
    });

    return (
        <>
            <Header title={I18n.t('events')} navigation={navigation} onBackPress={props.navigateToDashboardSummary} />
            <TabBar
                indicatorStyle={{ height: 0 }}
                style={Styles.tabBarStyle}
                selectedIndex={props.state.index}
                onSelect={onTabSelect}>
                {props.state.routes.map((route) => createNavigationTabForRoute(route, props.state.index))}
            </TabBar>
        </>
    );
};

export default EventsTopBarView;