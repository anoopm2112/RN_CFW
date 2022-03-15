import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SignUpView } from '../components';
import * as Actions from '../actions';
import { getUserType, getDistrictData, getLsgiTypeData } from '../selectors';

class SignUp extends React.Component {

    render() {
        return (
            <SignUpView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    userType: getUserType,
    dropdownData: getDistrictData,
    lsgiTypeData: getLsgiTypeData
});

const mapDispatchToProps = dispatch => ({
    navigateToLogin: (data) => dispatch(Actions.navigateToLogin(data)),
    addUser: (data) => dispatch(Actions.addUser(data)),
    loadLsgiType: (data) => dispatch(Actions.loadLsgiType(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
