import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BackgroundTimer from 'react-native-background-timer';
import { SideBarView } from '../components';
import { getSideBarData, getPlaystoreAppData, getNeedsUpdate } from '../selectors';
import { selectors as UserSelector } from '../../user';
import * as UserActions from '../../user/actions';
import * as DashboardActions from '../actions';
import * as LanguageActions from '../../language/actions';
import RNConfigReader from 'rn-config-reader';
import { LANGUAGES } from '../../language/constants';
import { getLanguage } from '../../language/selectors';

const { getUser, getUserRoles, getUserInfo } = UserSelector;

class SideBar extends Component {

    componentDidMount() {
        if (RNConfigReader.app_play_store_link) {
            this.props.appPlayStoreVersionCheck();
            BackgroundTimer.setInterval(() => {
                this.props.appPlayStoreVersionCheck();
            }, 300000);
        }
    }
    render() {
        return (
            <SideBarView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    sideBar: getSideBarData,
    user: getUser,
    userRoles: getUserRoles,
    playstoreAppData: getPlaystoreAppData,
    needsUpdate: getNeedsUpdate,
    language: getLanguage,
    userInfo: getUserInfo
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(UserActions.logout()),
    doLogout: () => dispatch(UserActions.doLogout()),
    dontLogout: () => dispatch(UserActions.dontLogout()),
    navigateToMyProfile: () => dispatch(UserActions.navigateToMyProfile()),
    appPlayStoreVersionCheck: () => dispatch(DashboardActions.appPlayStoreVersionCheck()),
    drawerStatus: (data) => dispatch(DashboardActions.drawerStatus(data)),
    updateLanguage: (langId) => {
        const language = LANGUAGES.find(LANGUAGE=> LANGUAGE.langId === langId);
        dispatch(LanguageActions.languageSelect({ language, restart: true }));
    },
    navigateToPassCode :(data) => dispatch(UserActions.navigateToPassCode(data)),
    setChildMode: (data) => dispatch(DashboardActions.setChildMode(data)),
    userTypeThemeSelection: (data) => dispatch(DashboardActions.userTypeThemeSelection(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
