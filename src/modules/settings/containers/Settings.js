import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getUserRoles } from '../../user/selectors';
import { SettingsView } from '../components';
import { getUserInfo } from '../../user/selectors';
import * as SettingsActions from '../actions';

class Settings extends React.Component {
    render() {
        return (
            <SettingsView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    userInfo: getUserInfo,
    userRoles: getUserRoles
});

const mapDispatchToProps = dispatch => ({
    navigateTo: (route, screen) => dispatch(SettingsActions.navigateTo(route, screen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
