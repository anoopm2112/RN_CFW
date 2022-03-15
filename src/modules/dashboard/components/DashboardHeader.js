import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from '@ui-kitten/components';
import { createStructuredSelector } from 'reselect';
import { DrawerActions } from '@react-navigation/native';
import { components, utils } from '../../../common';

const { dimensionUtils: { convertHeight, convertWidth } } = utils;

const { Icon, Header, TopNavigationAction, FontelloIcon } = components;

const DashboardHeader = ({ title, alignment, toggleDrawer }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        menuIcon: {
            width: convertWidth(24),
            height: convertHeight(20),
            resizeMode: 'contain'
        },
        menuIconContainer: {
            height: convertWidth(25),
            width: convertWidth(25),
            backgroundColor: theme['color-basic-1000'],
            borderRadius: convertHeight(5),
            alignItems: 'center',
            justifyContent:'center'
        }
    });

    const openDrawer = (toggleDrawer) => (
        <TopNavigationAction onPress={toggleDrawer}
            icon={(props) => <View style={styles.menuIconContainer}>
                <FontelloIcon {...props} name="side-menu-icon" size={convertWidth(10)} style={{ color: theme['color-basic-100'] }} />
            </View>} />
    );

    return (
        <Header
            title={title}
            accessoryLeft={() => openDrawer(toggleDrawer)}
            alignment={alignment}
        />
    );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleDrawer: () => ownProps.navigation.dispatch(DrawerActions.toggleDrawer())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
