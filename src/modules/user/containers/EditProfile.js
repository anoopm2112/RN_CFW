import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { EditProfileView } from '../components';
import { getUser, getUserType, getDistrictData, getLsgiTypeData } from '../selectors';
import * as UserActions from '../actions';

class EditProfile extends Component {

    render() {
        return (
            <EditProfileView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: getUser,
    userType: getUserType,
    dropdownData: getDistrictData,
    lsgiTypeData: getLsgiTypeData
});

const mapDispatchToProps = dispatch => ({
    updateProfile: (values) => dispatch(UserActions.updateProfile(values)),
    loadLsgiType: (data) => dispatch(UserActions.loadLsgiType(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);