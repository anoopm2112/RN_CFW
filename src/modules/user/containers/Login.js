import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { LoginView } from '../components';
import { getUser, getUserType } from '../selectors';
import * as Actions from '../actions';

class Login extends React.Component {

    render() {
        return (
            <LoginView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: getUser,
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({
    authenticate: (values) => dispatch(Actions.authenticate(values)),
    navigateToForgotPassword: () => dispatch(Actions.navigateToForgotPassword()),
    navigateToSignUp: () => dispatch(Actions.navigateToSignUp()),
    navigateToMobileOtp: (data) => dispatch(Actions.navigateToMobileOtp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
