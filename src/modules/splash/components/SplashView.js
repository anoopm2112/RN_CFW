import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { components, I18n, utils } from '../../../common';
import SplashScreen from 'react-native-splash-screen';
import BuildConfig from 'react-native-build-config';
import { USER_TYPE_SELECTED_STORE_KEY } from '../../user/constants';
import Storage from '../../../common/storages';
import { ThemeContext } from '../../../common/eva/theme-context';
import { USER_TYPE } from '../../user/constants';

const { SafeAreaView, Text, Icon } = components;
const { dimensionUtils: { convertWidth } } = utils;

const SplashView = () => {
    const themeContext = React.useContext(ThemeContext);
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        (async () => {
            let userType = await Storage.getItem(USER_TYPE_SELECTED_STORE_KEY);
            userType = userType ? JSON.parse(userType) : {};
            if (userType.name === USER_TYPE.CHILD) {
                themeContext.toggleTheme(USER_TYPE.CHILD);
            }
        })()
    }, []);

    return (
        <>
            <SafeAreaView>
                <View style={{ flex: 1, backgroundColor: BuildConfig.SPLASH_BG_COLOR }} />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    layoutStyle: {
        flex: 1
    },
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    coverContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cover: {
        width: 250,
        height: 250,
        borderRadius: 125
    },
    text: {
        color: '#8e97a6'
    },
    iconStyle: {
        height: convertWidth(250),
        width: convertWidth(250),
        resizeMode: "contain"
    }
});

export default SplashView;
