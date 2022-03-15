import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SummaryView } from '../components';
import { getHomeFeed } from '../selectors';
import * as Actions from '../actions';
import * as ComplaintActions from '../../complaints/actions';
import * as ServicesActions from '../../services/actions';
import { getUserType, getUserInfo } from '../../user/selectors';
import { getAllServices } from '../../services/selectors';

class Summary extends Component {
    render() {
        return (
            <SummaryView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    homeFeed: getHomeFeed,
    userType: getUserType,
    userInfo: getUserInfo,
    allServices: getAllServices
});

const mapDispatchToProps = (dispatch) => ({
    loadHomeFeed: (data) => dispatch(Actions.loadHomeFeed(data)),
    navigateToComplaintListScreen: () => dispatch(ComplaintActions.navigateToComplaintListScreen()),
    navigateToServicesListScreen: () => dispatch(ServicesActions.navigateToServicesListScreen()),
    navigateToTollFreeNumberView: () => dispatch(Actions.navigateToTollFreeNumberView()),
    likePost: (data) => dispatch(Actions.likePost(data)),
    ratePost: (data) => dispatch(Actions.ratePost(data)),
    appShare: (data) => dispatch(Actions.appShare(data)),
    showInfoToast: () => dispatch(ServicesActions.showInfoToast()),
    getService: () => dispatch(ServicesActions.getService()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
