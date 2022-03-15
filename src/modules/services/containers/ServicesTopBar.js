import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ServicesTopBarView } from '../components';
import * as DashboardActions from '../../dashboard/actions';
import * as ServiceActions from '../actions';

class ServicesTopBar extends Component {
    render() {
        return (
            <ServicesTopBarView {...this.props} />
        );
    }
}
const mapStateToProps = createStructuredSelector({
});


const mapDispatchToProps = (dispatch) => ({
    navigateToDashboardSummary: () => dispatch(DashboardActions.navigateToDashboardSummary()),
    navigateToServiceTypeScreen: () => dispatch(ServiceActions.navigateToServiceTypeScreen())
});


export default connect(mapStateToProps, mapDispatchToProps)(ServicesTopBar);
