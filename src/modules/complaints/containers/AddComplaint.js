import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AddComplaintView } from '../components';
import * as Actions from '../actions';
import { getComplaintImage, getComplaintLocation } from '../selectors';
import { getUserType } from '../../user/selectors';

class AddComplaint extends Component {
    render() {
        return <AddComplaintView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    complaintImage: getComplaintImage,
    complaintLocation: getComplaintLocation,
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({
    navigateToComplaintImage: (data) => dispatch(Actions.navigateToComplaintImage(data)),
    newComplaintImage: (data) => dispatch(Actions.newComplaintImage(data)),
    navigateToComplaintLocation: () => dispatch(Actions.navigateToComplaintLocation()),
    saveNewComplaint: (data) => dispatch(Actions.saveNewComplaint(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaint);