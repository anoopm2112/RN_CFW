import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ContentDetailsView } from '../components';
import { getUserType } from '../../user/selectors';

class ContentDetails extends Component {
    render() {
        return <ContentDetailsView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetails);