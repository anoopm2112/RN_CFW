import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NewsDetailsView } from '../components';
import { getUserType } from '../../user/selectors';

class NewsDetails extends Component {
    render() {
        return <NewsDetailsView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetails);