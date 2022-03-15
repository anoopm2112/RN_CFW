import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { EventDetailsView } from '../components';
import * as Actions from '../actions';
import { getUserType } from '../../user/selectors';

class EventDetails extends Component {
    render() {
        return <EventDetailsView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({
    registerEvent: (data) => dispatch(Actions.registerEvent(data)),
    cancelRegisterEvent: (data) => dispatch(Actions.cancelRegisterEvent(data)),
    eventShare: (data) => dispatch(Actions.eventShare(data)),
    navigateToEventsListScreen: (data) => dispatch(Actions.navigateToEventsListScreen(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);