import React from 'react';
import _ from 'lodash';
import { FloatingAction as FloatingActionLib } from "react-native-floating-action";
import { useTheme, Icon } from '@ui-kitten/components';
import { dimensionUtils, userUtils } from '../utils';
import I18n from '../i18n';
import FontelloIcon from './FontelloIcon';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getUserType } from '../../modules/user/selectors';
import { ROLE_TYPES } from '../../common/constants';

const { convertHeight, convertWidth } = dimensionUtils;

const FloatingAction = ({ color, floatingIcon }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const userInfo = useSelector(getUserInfo);
    const userType = useSelector(getUserType);
    const defaultThemeColor = theme['color-basic-100'];
    // const defaultItemProps = { color: defaultThemeColor };
    // pass ItemClick action in actions[] as onPress: () => func(data)
    // actions = actions.map(item => ({ ...defaultItemProps, ...item }));

    const actions = [
        {
            text: I18n.t('donate_now'),
            icon: <FontelloIcon name="service_mechanism" size={convertWidth(20)} style={{ color: theme['color-basic-800'] }} />,
            name: "Donate now",
            position: 1,
            onPress: () => {
                const ServiceActions = require('../../modules/services/actions');
                dispatch(ServiceActions.navigateToBalanidhiViewScreen());
            },
            color: defaultThemeColor,
            textStyle: { fontSize: convertWidth(14) }
        },
        {
            text: I18n.t('child_protection_systems'),
            icon: <FontelloIcon name="cps" size={convertWidth(20)} style={{ color: theme['color-basic-800'] }} />,
            name: "Child Protection System",
            position: 2,
            onPress: () => {
                const ChildProtectionSystemActions = require('../../modules/childProtectionSystem/actions');
                dispatch(ChildProtectionSystemActions.navigateToChildProtectionList());
            },
            color: defaultThemeColor,
            textStyle: { fontSize: convertWidth(14) }
        },
        {
            text: I18n.t('emergency_contact'),
            icon: <FontelloIcon name="toll-free-number" size={convertWidth(20)} style={{ color: theme['color-basic-800'] }} />,
            name: "toll free number",
            position: 3,
            onPress: () => {
                const DashboardActions = require('../../modules/dashboard/actions');
                dispatch(DashboardActions.navigateToTollFreeNumberView());
            },
            color: defaultThemeColor,
            textStyle: { fontSize: convertWidth(14) }
        },
        {
            text: I18n.t('events'),
            icon: <FontelloIcon name="events-icon" size={convertWidth(20)} style={{ color: theme['color-basic-800'] }} />,
            name: "events",
            position: 4,
            onPress: () => {
                const EventsActions = require('../../modules/events/actions');
                const ServiceActions = require('../../modules/services/actions');
                if (!userUtils.hasChildRole(userInfo) && userType.roleType === ROLE_TYPES.ROLE_CHILD) {
                    dispatch(ServiceActions.showInfoToast());
                } else {
                    dispatch(EventsActions.navigateToEventsListScreen());
                }

            },
            color: defaultThemeColor,
            textStyle: { fontSize: convertWidth(14) }

        },
        {
            text: I18n.t('news'),
            icon: <FontelloIcon name="news-icon" size={convertWidth(20)} style={{ color: theme['color-basic-800'] }} />,
            name: "news",
            position: 5,
            onPress: () => {
                const NewsActions = require('../../modules/news/actions');
                dispatch(NewsActions.navigateToNewsScreen());
            },
            color: defaultThemeColor,
            textStyle: { fontSize: convertWidth(14) }
        },
    ];

    return <FloatingActionLib
        distanceToEdge={convertHeight(15)}
        floatingIcon={floatingIcon}
        color={color || defaultThemeColor}
        actions={actions}
        onPressItem={name => {
            let pressed = _.find(actions, { name });
            if (pressed && pressed.onPress) {
                pressed.onPress();
            }
        }}
    />;
};

export default FloatingAction;
