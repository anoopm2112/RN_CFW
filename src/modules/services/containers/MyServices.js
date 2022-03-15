import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MyServicesView } from '../components';
import * as Actions from '../actions';
import { getMyServices } from '../selectors';

class MyServices extends Component {
    render() {
        return <MyServicesView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    myServices: getMyServices
});

const mapDispatchToProps = dispatch => ({
    loadMyService: () => dispatch(Actions.loadMyService()),
    unSubscribeServices: (data) => dispatch(Actions.unSubscribeServices(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyServices);