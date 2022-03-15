import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PassCodeView } from '../components';
import * as Actions from '../actions';

class PassCode extends Component {

    render() {
        return (
            <PassCodeView {...this.props} />
        );
    }
}


const mapDispatchToProps = dispatch => ({
    prepareEncryptionKey: (data) => dispatch(Actions.prepareEncryptionKey(data)),
    forgotPassCode: () => dispatch(Actions.navigateToPassCode({ status: 'choose', reinitialize: true, resetPassCode: true, forgetPinStatus: true }))
});

export default connect(null, mapDispatchToProps)(PassCode);
