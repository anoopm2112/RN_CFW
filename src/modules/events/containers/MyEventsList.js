import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MyEventsListView } from '../components';
import * as Actions from '../actions';
import { getMyEvents } from '../selectors';
import { getUserType } from '../../user/selectors';

class MyEventsList extends Component {
    render() {
        return <MyEventsListView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    myEvents: getMyEvents,
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({
    loadMyEvents: () => dispatch(Actions.loadMyEvents()),
    navigateToEventDetails: (data) => dispatch(Actions.navigateToEventDetails(data)),

});
export default connect(mapStateToProps, mapDispatchToProps)(MyEventsList);