import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { components, I18n, MODULE_ROUTE_KEYS, utils } from '../../../common';
import { ROUTE_KEYS as USER_ROUTE_KEYS } from '../../user';
import { ROUTE_KEYS as LANG_ROUTE_KEYS } from '../../language';
import { ROUTE_KEYS as SETTINGS_ROUTE_KEYS } from '../constants';
import { userUtils } from '../../../common/utils';
import { ROLE_TYPES } from '../../../common/constants';

const {
    dimensionUtils: { convertHeight, convertWidth },
    permissionUtils: { hasAccessPermission }
} = utils;
const { SafeAreaView, List, ListItem, Icon, Header } = components;

const ArrowIcon = (props) => (
    <Icon name="chevron-right" pack="material-community" {...props} />
);

const arrowExcludedMenus = ['format-float-right', 'sync'];

class SettingsView extends React.Component {

    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this);
    }
    _renderItem({ item }) {
        return (
            <ListItem style={styles.listRowView}
                cardView={false}
                title={item.label}
                accessoryRight={!arrowExcludedMenus.includes(item.iconName) ? ArrowIcon : null}
                accessoryLeft={(props) => (
                    <Icon name={item.iconName} pack="material-community" {...props} />
                )}
                onPress={() => {
                    if (item.route) {
                        this.props.navigateTo(item.route, item.screen);
                    } 
                }} />
        );
    }

    render() {
        const settingsRoutes = [
            { label: I18n.t('change_password'), iconName: 'lock-outline', route: MODULE_ROUTE_KEYS.USER, screen: USER_ROUTE_KEYS.CHANGE_PASSWORD },
            { label: I18n.t('change_language'), iconName: 'translate', route: MODULE_ROUTE_KEYS.LANGUAGE, screen: LANG_ROUTE_KEYS.LANGUAGE_UPDATE }
        ];
        if (userUtils.hasDeveloperRole(this.props.userInfo)) {
            settingsRoutes.push(
                { label: I18n.t('developer_options'), iconName: 'wrench-outline', route: SETTINGS_ROUTE_KEYS.DEVELOPER_OPTIONS }
            );
        }
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <Header title={I18n.t('settings')} />
                    <List
                        style={styles.container}
                        data={settingsRoutes}
                        renderItem={this._renderItem}
                    />
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    listRowView: {
        marginTop: convertHeight(7),
        marginHorizontal: convertWidth(7)
    }
});

export default SettingsView;
