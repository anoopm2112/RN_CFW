import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { EventsTopBarView } from '../components';
import * as DashboardActions from '../../dashboard/actions';

class EventsTopBar extends Component {
    render() {
        return (
            <EventsTopBarView {...this.props} />
        );
    }
}
const mapStateToProps = createStructuredSelector({
});


const mapDispatchToProps = (dispatch) => ({
    navigateToDashboardSummary: () => dispatch(DashboardActions.navigateToDashboardSummary())
});


export default connect(mapStateToProps, mapDispatchToProps)(EventsTopBar);
