import React, { useEffect, useState, useCallback } from 'react';
import { Linking, Image, TouchableOpacity } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useTheme } from '@ui-kitten/components';
import RNConfigReader from 'rn-config-reader';
import { components, utils, I18n, MODULE_ROUTE_KEYS } from '../../../common';
import { ROUTE_KEYS as DASHBOARD_ROUTE_KEYS } from '../../dashboard/constants';
import { ROUTE_KEYS as USER_ROUTE_KEYS } from '../../user/constants';
import { View, Text as RCTText } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { LANGUAGES } from '../../language/constants';
import { ThemeContext } from '../../../common/eva/theme-context';
import { USER_TYPE } from '../../user/constants';
import Storage from '../../../common/storages';
import { USER_TYPE_SELECTED_STORE_KEY, ROLE_TYPE } from '../../user/constants';
import { SHARE_ITEMS } from '../../../common/constants';
import Share from 'react-native-share';

const { userUtils, dimensionUtils: { convertWidth, convertHeight }, permissionUtils: { hasAccessPermission } } = utils;

const { SafeAreaView, Drawer, Text, DrawerItem, Icon, FontelloIcon, IndexPath, StyleService, useStyleSheet, Content, Modal, DrawerGroup, Toggle } = components;

const SideBarView = ({ user, ...props }) => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [drawerGroupItem, setDrawerGroup] = useState(false);
    const [language, setUpdateLanguage] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const themeContext = React.useContext(ThemeContext);

    const toggleChildModeSwitch = async (value) => {
        if (value) {
            props.userTypeThemeSelection({
                'name': USER_TYPE.CHILD,
                'themeContext': themeContext,
                'roleType': ROLE_TYPE.CHILD
            });
            setIsEnabled(true);
            props.setChildMode(true);
        } else {
            props.userTypeThemeSelection({
                'themeContext': themeContext
            });
            setIsEnabled(false);
            props.navigateToPassCode({ status: 'enter', reinitialize: true, forgetPinStatus: false });
        }
    }

    useEffect(() => {
        let index = null;
        let currentRoute = props.sideBar.currentRoute;
        routes().some((route) => {
            if (route.name === currentRoute || (route.params && route.params.screen === currentRoute) || (route.subRoutes && route.subRoutes.indexOf(currentRoute) > -1)) {
                index = new IndexPath(route.key);
                return true;
            }
            return false;
        });
        setSelectedIndex(index);
    }, [props.sideBar.currentRoute, routes]);

    useEffect(() => {
        props.drawerStatus(true);
        getUserType();
        if (props.language.langId === LANGUAGES[0].langId) {
            setUpdateLanguage(false)
        } else {
            setUpdateLanguage(true);
        }
        if (props.needsUpdate !== undefined)
            if (props.needsUpdate) {
                setShowUpdateModal(true);
            }
    }, [props.needsUpdate]);

    const getUserType = async () => {
        let userType = await Storage.getItem(USER_TYPE_SELECTED_STORE_KEY);
        userType = userType ? JSON.parse(userType) : {};
        if (userType.name === USER_TYPE.CHILD) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    }

    const shareApp = async () => {
        try {
            await Share.open({
                url: SHARE_ITEMS.APP_LINK,
                message: `${I18n.t('app_download_desc')}`
            });
        } catch (error) {
            // NOOP
        }
    }

    const routes = useCallback(() => {
        let key = 0;
        let menu = [];

        menu.push(
            // {
            // key: key++,
            // title: I18n.t('settings'),
            // drawerIcon: { icon_name: 'settings-sidebar', icon_size: convertHeight(21) },
            // name: MODULE_ROUTE_KEYS.SETTINGS,
            // params: {}
            // },
            {
                key: key++,
                title: I18n.t('change_password'),
                drawerIcon: { icon_name: 'side-change-password', icon_size: convertHeight(17) },
                name: MODULE_ROUTE_KEYS.USER,
                params: {
                    screen: USER_ROUTE_KEYS.CHANGE_PASSWORD
                }
            },
            {
                key: key++,
                title: I18n.t('about_us'),
                drawerIcon: { icon_name: 'aboutus-sidebar', icon_size: convertHeight(19) },
                name: MODULE_ROUTE_KEYS.ABOUTUS,
                params: {}
            },
            {
                key: key++,
                title: I18n.t('share_app'),
                drawerIcon: { icon_name: 'side-share-icon', icon_size: convertHeight(19.55) },
                onPress: () => shareApp()
            },
            {
                key: key++,
                title: I18n.t('logout'),
                drawerIcon: { icon_name: 'logout-sidebar', icon_size: convertHeight(19) },
                onPress: props.logout
            }
        );

        return menu;
    }, [props.logout]);

    const DrawerHeader = () => {
        let style = styles.drawerHeaderView;
        if (useIsDrawerOpen()) {
            style.width = convertWidth(306);
        }
        return (
            <SafeAreaView forceInset={{ bottom: 'always' }} style={style}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.closeDrawer();
                        props.navigateToMyProfile();
                        props.drawerStatus(false);
                    }}
                    style={styles.userView}>
                    {user.info?.additionalInfo?.photo ?
                        <Image style={styles.iconStyle} source={{ uri: `data:image/*;base64,${user.info.additionalInfo.photo}` }} />
                        :
                        <Icon name={'account-circle'} pack="material-community" style={[styles.iconStyle, { color: theme['color-basic-100'] }]} />
                    }
                    <RCTText numberOfLines={1} style={styles.userNameText}>{userUtils.getFullName(user).includes(undefined) ? '' : userUtils.getFullName(user)}</RCTText>
                    <RCTText numberOfLines={1} style={{ color: theme['color-basic-100'], fontSize: convertHeight(12), paddingLeft: convertWidth(12) }}></RCTText>
                    <FontelloIcon name="side-arrow-icon" size={convertHeight(19.55)} color={theme['color-basic-100']} style={{ position: 'absolute', right: 20, top: 25 }} />
                </TouchableOpacity>
                <View style={styles.languageSwitchContainer}>
                    <View style={[styles.languageIconContainer, { backgroundColor: language ? theme['color-basic-1006'] : theme['color-basic-100'] }]}>
                        <Text category="h5" style={{ textAlign: 'center', color: language ? theme['color-basic-100'] : theme['text-black-color'] }}>English</Text>
                    </View>
                    <Toggle
                        status='basic'
                        checked={language}
                        onChange={() => {
                            setUpdateLanguage(language ? false : true);
                            const langId = props.language.langId === 1 ? 2 : 1;
                            props.updateLanguage(langId)
                        }
                        }>
                    </Toggle>
                    <View style={[styles.languageIconContainer, { backgroundColor: language ? theme['color-basic-100'] : theme['color-basic-1006'] }]}>
                        <Text category="h5" style={{ textAlign: 'center', color: language ? theme['text-black-color'] : theme['color-basic-100'] }}>മലയാളം</Text>
                    </View>
                </View>
                {!userUtils.hasChildRole(props.userInfo) &&
                    <View style={styles.childSwitchContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.childIconContainer}>
                                <FontelloIcon name="child" size={convertHeight(19.55)} color={theme['color-basic-100']} style={styles.drawerItemIcon} />
                            </View>
                            <Text category="h5" appearance="alternative" style={{ textAlign: 'center', paddingTop: 10, paddingLeft: 7 }}>{I18n.t('child_mode')}</Text>
                        </View>
                        <Toggle
                            status='basic'
                            onChange={(checked) => toggleChildModeSwitch(checked)}
                            checked={isEnabled}
                        />
                    </View>}
                {
                    <Modal visible={props.sideBar.logoutModal.enabled}
                        type='confirm'
                        message={props.sideBar.logoutModal.message ? I18n.t(props.sideBar.logoutModal.message) : ''}
                        okText={I18n.t('logout')}
                        onOk={() => {
                            props.doLogout();
                        }}
                        cancelText={I18n.t('cancel')}
                        onCancel={() => {
                            props.dontLogout();
                        }}
                    />
                }

                {
                    props.playstoreAppData !== undefined &&
                    <Modal visible={showUpdateModal}
                        cancelText={I18n.t('skip')}
                        okText={I18n.t('update_now')}
                        type={!props.playstoreAppData.updateApp ? 'confirm' : ''}
                        message={I18n.t('latest_version')}
                        onOk={() => { setShowUpdateModal(false); Linking.openURL(`${RNConfigReader.app_play_store_link}`); }}
                        onCancel={() => { props.playstoreAppData.updateApp ? setShowUpdateModal(true) : setShowUpdateModal(false); }}
                    />
                }
            </SafeAreaView >
        );
    }

    const DrawerFooter = () => (
        <>
            <View style={styles.footerCloseBtnContainer}>
                <TouchableOpacity onPress={props.navigation.closeDrawer} style={styles.footerCloseBtn}>
                    <FontelloIcon name="close-sidebar" size={convertHeight(15)} color={theme['color-basic-100']} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
        </>
    );

    const onItemSelect = (index) => {
        const selectedRoute = routes()[index.row];
        if (selectedRoute.name) {
            props.navigation.navigate(selectedRoute.name, { ...selectedRoute.params });
            props.navigation.closeDrawer();
            props.drawerStatus(false);
        } else if (selectedRoute.onPress) {
            setSelectedIndex(index);
            selectedRoute.onPress();
            props.navigation.closeDrawer();
            props.drawerStatus(false);
        }
    };

    const createDrawerItemForRoute = (route) => {
        if (route.subRoutes) {
            return (
                <DrawerGroup onPressIn={() => setDrawerGroup(!drawerGroupItem)} key={route.key} accessoryLeft={route.drawerIcon}
                    style={[styles.submenuDrawerItem, {
                        marginTop: convertHeight(19),
                        borderTopStartRadius: convertWidth(5),
                        borderBottomLeftRadius: drawerGroupItem ?
                            convertWidth(0) :
                            convertWidth(5)
                    }]}
                    title={<Text category='h5' appearance='alternative'>{route.title}</Text>}>
                    {route.subRoutes.map((item, i) => {
                        return (
                            <DrawerItem
                                key={item.key}
                                accessoryLeft={item.drawerIcon}
                                title={<Text style={{ fontSize: convertHeight(12) }} appearance='alternative'>{item.title}</Text>}
                                style={[styles.submenuDrawerItem, {
                                    borderBottomLeftRadius:
                                        route.subRoutes.length - 1 === i ?
                                            convertWidth(5) :
                                            convertWidth(0)
                                }]}
                                onPress={() => {
                                    props.navigation.closeDrawer();
                                    props.navigation.navigate(item.name, { ...item.params })
                                }}
                            />
                        )
                    })}
                </DrawerGroup>
            );
        } else {
            return (
                <DrawerItem
                    key={route.key}
                    title={<Text category='h5' appearance='alternative'>{route.title}</Text>}
                    accessoryLeft={() => (
                        <View style={styles.drawerIconContainer}>
                            <FontelloIcon
                                name={route.drawerIcon.icon_name}
                                size={route.drawerIcon.icon_size}
                                color={theme['color-basic-100']}
                                style={styles.drawerItemIcon} />
                        </View>)}
                    style={styles.drawerItem}
                />
            );
        }
    };

    return (
        <Drawer
            header={DrawerHeader}
            footer={DrawerFooter}
            appearance={'noDivider'}
            selectedIndex={selectedIndex}
            onSelect={onItemSelect}
            style={[styles.drawer, { height: userUtils.hasChildRole(props.userInfo) ? convertHeight(165) : convertHeight(55) }]}
        >
            <Content>
                {routes().map(createDrawerItemForRoute)}
            </Content>
        </Drawer>
    );
};

const themedStyles = StyleService.create({
    drawerHeaderView: {
        height: convertHeight(320),
        backgroundColor: 'color-basic-1005'
    },
    closeIconView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: convertHeight(15),
        paddingRight: convertWidth(12)
    },
    closeIcon: {
        height: convertHeight(14),
        width: convertHeight(14),
    },
    userView: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: convertHeight(100),
        paddingBottom: convertHeight(20),
        borderBottomWidth: 0.5,
        borderBottomColor: 'color-basic-100',
        marginTop: convertHeight(15)
    },
    userSvg: {
        position: 'relative'
    },
    userIcon: {
        position: 'absolute',
        top: convertHeight(26),
        left: convertWidth(34),
        width: convertHeight(37.07),
        height: convertHeight(37.07),
        resizeMode: 'contain'
    },
    userNameText: {
        marginLeft: convertWidth(12),
        fontFamily: 'Roboto-Medium',
        fontSize: convertHeight(16),
        fontWeight: '500',
        color: 'color-basic-100',
        flexShrink: 1
    },
    drawerItem: {
        marginLeft: convertWidth(10),
        backgroundColor: 'color-basic-1005',
        borderRadius: convertWidth(5)
    },
    submenuDrawerItem: {
        marginLeft: convertWidth(25),
        backgroundColor: 'rgba(255, 255, 244, 0.07)',
        width: '91%',
    },
    drawerItemIcon: {
        width: convertHeight(20),
        height: convertHeight(20)
    },
    drawer: {
        backgroundColor: 'color-basic-1005'
    },
    footer: {
        backgroundColor: 'color-basic-1005',
        color: 'color-primary-300',
        textAlign: 'center'
    },
    iconStyle: {
        width: convertWidth(80),
        height: convertHeight(80),
        borderRadius: convertHeight(80 / 2)
    },
    drawerIconContainer: {
        height: convertHeight(45),
        width: convertHeight(45),
        backgroundColor: 'color-basic-1006',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    childIconContainer: {
        height: convertHeight(45),
        width: convertHeight(45),
        backgroundColor: 'color-basic-1006',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    footerCloseBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'color-basic-1005'
    },
    footerCloseBtn: {
        height: convertHeight(50),
        width: convertHeight(50),
        backgroundColor: 'color-basic-1006',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: convertHeight(50 / 2),
        marginVertical: convertHeight(10)
    },
    childSwitchContainer: {
        justifyContent: 'space-between',
        paddingTop: convertHeight(17),
        flexDirection: 'row',
        paddingHorizontal: convertWidth(17)
    },
    languageSwitchContainer: {
        justifyContent: 'space-between',
        paddingTop: convertHeight(17),
        flexDirection: 'row',
        paddingHorizontal: convertWidth(17)
    },
    languageIconContainer: {
        height: convertHeight(45),
        width: convertHeight(85),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
});

export default SideBarView;
