import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ComplaintsListView } from '../components';
import * as Actions from '../actions';
import { getComplaintListData } from '../selectors';

class ComplaintsList extends Component {
    render() {
        return <ComplaintsListView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    complaintListData: getComplaintListData
});

const mapDispatchToProps = dispatch => ({
    navigateToAddComplaint: (data) => dispatch(Actions.navigateToAddComplaint(data)),
    loadComplaintList: () => dispatch(Actions.loadComplaintList())
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsList);