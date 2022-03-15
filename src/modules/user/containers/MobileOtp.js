import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MobileOtpView } from '../components';
import { getUser } from '../selectors';
import * as Actions from '../actions';

class MobileOtp extends React.Component {

    render() {
        return (
            <MobileOtpView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: getUser
});

const mapDispatchToProps = dispatch => ({
    navigateToSignUp: () => dispatch(Actions.navigateToSignUp()),
    navigateToOtpVerification: () => dispatch(Actions.navigateToOtpVerification()),
    sendOtp: (values) => dispatch(Actions.sendOtp(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileOtp);
