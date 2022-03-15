import React, { Component } from 'react';
import { ComplaintLocationView } from '../components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as ComplaintActions from '../actions';

class ComplaintLocation extends Component {
    render() {
        return (
            <ComplaintLocationView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => ({
    newComplaintLocation: (data) => dispatch(ComplaintActions.newComplaintLocation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintLocation);

