import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import IconBadge from 'react-native-icon-badge';
import { TopNavigation, TopNavigationAction, Icon, Text } from '@ui-kitten/components';
import { navigation } from '../actions';
import { dimensionUtils, userUtils } from "../../common/utils";
import { useTheme } from '@ui-kitten/components';
import { getUserRoles, getUserType, getUserInfo } from '../../modules/user/selectors';
import { FontelloIcon } from '../../common/components';
import { ROLE_TYPES } from '../../common/constants';


const { navigateBack } = navigation;
const { convertWidth, convertHeight } = dimensionUtils;

const Header = ({
    style,
    navigateBack,
    alignment = 'center',
    title,
    loadNotificationView,
    loadNotificationsCount,
    startHeaderQRCodeScanning,
    notifications = {},
    userRoles,
    userInfo,
    userType,
    showInfoToast,
    onBackPress,
    ...rest }) => {

    useEffect(() => {
        loadNotificationsCount();
    }, [loadNotificationsCount]);

    const { newNotifications = 0 } = notifications;

    const BackIcon = (props) => (
        <TouchableOpacity onPress={onBackPress ? onBackPress : navigateBack}
            style={styles.backButton}>
            <FontelloIcon {...props} name="back-button" size={convertWidth(14)} style={{ color: theme['color-basic-1003'] }} />
        </TouchableOpacity>
    );

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} />
    );

    const ScannerAndNotificationsAction = () => (
        <View style={styles.scannerAndNotificationsWrapperView}>
            <TouchableOpacity style={styles.notificationTouchableStyle} onPress={() => {
                if (!userUtils.hasChildRole(userInfo) && userType.roleType === ROLE_TYPES.ROLE_CHILD) {
                    showInfoToast();
                } else {
                    loadNotificationView();
                }
            }}
            >
                <IconBadge
                    MainElement={
                        <View style={{ height: convertWidth(25), width: convertWidth(25), backgroundColor: theme['color-basic-1000'], borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <FontelloIcon name="notify-bell" size={convertWidth(10)} style={{ color: theme['color-basic-100'] }} />
                        </View>
                    }
                    BadgeElement={
                        <Text appearance='alternative' category='c2'>!</Text>
                    }
                    IconBadgeStyle={styles.iconBadgeStyle}
                    Hidden={(newNotifications || 0) === 0}
                />
            </TouchableOpacity>
        </View >
    );

    const theme = useTheme();

    const styles = StyleSheet.create({
        header: {
            height: convertHeight(16),
            backgroundColor: theme['color-basic-1008']
        },
        scannerAndNotificationsWrapperView: {
            flexDirection: 'row'
        },
        scanIcon: {
            width: convertHeight(20),
            height: convertHeight(20),
            resizeMode: 'contain'
        },
        notificationIcon: {
            width: convertWidth(16.41),
            height: convertHeight(20),
            resizeMode: 'contain'
        },
        iconBadgeStyle: {
            minWidth: convertWidth(15),
            width: convertWidth(15),
            height: convertHeight(15),
            backgroundColor: '#F00',
            top: convertHeight(-8),
            left: convertWidth(8)
        },
        titleView: {
            width: convertWidth(180)
        },
        scanTouchableStyle: {
            marginRight: convertWidth(30)
        },
        notificationTouchableStyle: {
            marginRight: convertWidth(8)
        },
        backButton: {
            width: convertWidth(35),
            height: convertWidth(35),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: convertWidth(20)
        },
        titleColor: {
            color: theme['color-basic-1003']
        }
    });

    return (
        <TopNavigation
            alignment={alignment}
            accessoryLeft={BackAction}
            accessoryRight={ScannerAndNotificationsAction}
            style={{ ...styles.header, ...style }}
            title={title ? <View style={[styles.titleView, { alignItems: alignment === 'center' ? 'center' : 'flex-start', paddingRight: alignment === 'center' ? convertWidth(15) : 0, paddingLeft: alignment === 'start' ? convertWidth(15) : 0 }]}><Text numberOfLines={2} category='h6' style={styles.titleColor}>{title}</Text></View> : null}
            {...rest}
        />
    );
};

const mapStateToProps = createStructuredSelector({
    userRoles: getUserRoles,
    userType: getUserType,
    userInfo: getUserInfo
});

const mapDispatchToProps = dispatch => ({
    navigateBack: () => dispatch(navigateBack()),
    loadNotificationView: () => {
        const DashboardActions = require('../../modules/dashboard/actions')
        dispatch(DashboardActions.navigateToNotificationView());
    },
    // loadNotificationsCount: () => dispatch(UserActions.loadNotificationData()),
    // loadNotificationView: () => { },
    loadNotificationsCount: () => 1,
    startHeaderQRCodeScanning: () => {
        const DashboardActions = require('../../modules/dashboard/actions');
        dispatch(DashboardActions.startHeaderQRCodeScanning());
    },
    showInfoToast: () => {
        const ServiceActions = require('../../modules/services/actions')
        dispatch(ServiceActions.showInfoToast());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
