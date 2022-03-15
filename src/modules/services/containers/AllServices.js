import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AllServicesView } from '../components';
import * as Actions from '../actions';
import { getAllServices } from '../selectors';

class AllServices extends Component {
    render() {
        return <AllServicesView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    allServices: getAllServices
});

const mapDispatchToProps = dispatch => ({
    getService: () => dispatch(Actions.getService()),
    subscribeServices: (data) => dispatch(Actions.subscribeServices(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllServices);