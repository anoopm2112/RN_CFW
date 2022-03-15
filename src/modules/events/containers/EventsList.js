import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { EventsListView } from '../components';
import * as Actions from '../actions';
import { getAllUpcomingEvents } from '../selectors';
import { getUserType } from '../../user/selectors';

class EventsList extends Component {
    render() {
        return <EventsListView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    upcomingEvents: getAllUpcomingEvents,
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({
    getUpcomingEvents: () => dispatch(Actions.getUpcomingEvents()),
    navigateToEventDetails: (data) => dispatch(Actions.navigateToEventDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);