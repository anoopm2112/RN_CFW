import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './RootNavigation';
import { isReadyRef, navigationRef } from './constants';
import { actions, utils, constants } from '../common';
import * as DashboardActions from '../modules/dashboard/actions';
import firebase from 'react-native-firebase';
import { createStructuredSelector } from 'reselect';
import { getUserType, getUserInfo, getChannelIds } from '../modules/user/selectors';
import Storage from '../common/storages';
import { USER_CHANNEL_IDS } from '../modules/user/constants';
import _ from 'lodash';

const { userUtils, notificationUtil } = utils;
const { ROLE_TYPES } = constants;

const { routeChanged } = actions;

class AppNavigation extends Component {

    componentDidMount() {
        isReadyRef.current = false;
        this.createNotificationListeners();
    }

    createNotificationListeners = async () => {
        let channelIds = await Storage.getItem(USER_CHANNEL_IDS);
        channelIds = channelIds ? JSON.parse(channelIds) : {};
        console.tron.log(channelIds);
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body, data } = notification;
            console.tron.log('title---------notificationListener', notification);
            if (Platform.OS === 'android') {
                _.forEach(channelIds, function (value) {
                    const localNotification = new firebase.notifications.Notification({
                        sound: 'default',
                        show_in_foreground: true,
                    })
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setSubtitle(notification.subtitle)
                        .setBody(notification.body)
                        .setData(notification.data)
                        .android.setChannelId(value) // e.g. the id you chose above
                        //   .android.setSmallIcon('ic_stat_notification') // create this icon in Android Studio
                        //   .android.setColor('#000000') // you can set a color here
                        .android.setPriority(firebase.notifications.Android.Priority.High);

                    firebase.notifications()
                        .displayNotification(localNotification)
                        .catch(err => console.error(err));
                });

            } else if (Platform.OS === 'ios') {
                const localNotification = new firebase.notifications.Notification()
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .ios.setBadge(notification.ios.badge);

                firebase.notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));
            }
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            console.tron.log('---notif listner---', notificationOpen.notification)
            let notification = {
                notifications: notificationOpen.notification,
            }
            if (!userUtils.hasChildRole(this.props.userInfo) && this.props.userType.roleType != ROLE_TYPES.ROLE_CHILD) {
                this.props.notifications(notification);
                this.props.showNotification(notification);
            }
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body, data } = notificationOpen.notification;
            console.tron.log('notificationOpen', notificationOpen.notification);
            let notification = {
                notifications: notificationOpen.notification,
            }
            if (!userUtils.hasChildRole(this.props.userInfo) && this.props.userType.roleType != ROLE_TYPES.ROLE_CHILD) {
                this.props.notifications(notification);
                this.props.showNotification(notification);
            }
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.tron.log('messageListener-----------', JSON.stringify(message));
        });
    }

    render() {
        return (
            <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                    isReadyRef.current = true;
                }}
                onStateChange={() => {
                    this.props.routeChanged(navigationRef.current.getCurrentRoute().name);
                }}
            >
                <RootNavigation />
            </NavigationContainer>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    channelIds: getChannelIds,
    userType: getUserType,
    userInfo: getUserInfo
});

const mapDispatchToProps = dispatch => ({
    routeChanged: (name) => dispatch(routeChanged(name)),
    notifications: (data) => dispatch(DashboardActions.notifications(data)),
    showNotification: (data) => dispatch(DashboardActions.showNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
