import React, { useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { components, I18n, utils } from '../../../common';
import { useTheme } from '@ui-kitten/components';
import { convertWidth } from '../../../common/utils/dimensionUtil';
const { dimensionUtils: { convertHeight } } = utils;
const { Divider, TabBar, Tab, Text, Header } = components

const ServicesTopBarView = ({ user, ...props }) => {
    const { navigation } = props;
    const onTabSelect = (index) => {
        const selectedTabRoute = props.state.routeNames[index];
        props.navigation.navigate(selectedTabRoute);
    };

    const createNavigationTabForRoute = (route, i) => {
        const { options } = props.descriptors[route.key];
        return (
            <Tab
                key={route.key}
                title={props => (
                    <View
                        style={{
                            height: convertWidth(30), width: convertWidth(150),
                            backgroundColor: i === options.index ? theme['color-basic-1000'] : theme['color-basic-1010'],
                            justifyContent: 'center', alignItems: 'center',
                            borderRadius: convertWidth(10)
                        }}>
                        <Text
                            numberOfLines={1} category="h1" {...props}
                            style={[props.style, { color: i === options.index ? theme['color-basic-100'] : theme['color-basic-1000'] }]}>
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
            paddingTop: convertHeight(15),
            paddingBottom: convertWidth(10)
        }
    });

    return (
        <>
            <Header title={I18n.t('services')} navigation={navigation} />
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

export default ServicesTopBarView;