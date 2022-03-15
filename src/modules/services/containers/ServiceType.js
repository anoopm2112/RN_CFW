import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ServiceTypeView } from '../components';
import * as Actions from '../actions';
import { getUserInfo, getUserType } from '../../user/selectors';
import * as DashboardActions from '../../dashboard/actions';

class ServiceType extends Component {
    render() {
        return <ServiceTypeView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    userInfo: getUserInfo,
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({
    navigateToServicesListScreen: (data) => dispatch(Actions.navigateToServicesListScreen(data)),
    showInfoToast: () => dispatch(Actions.showInfoToast()),
    navigateToDashboardSummary: () => dispatch(DashboardActions.navigateToDashboardSummary()),
    navigateToBalanidhiViewScreen: () => dispatch(Actions.navigateToBalanidhiViewScreen())
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceType);