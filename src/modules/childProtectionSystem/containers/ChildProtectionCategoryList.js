import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ChildProtectionCategoryListView } from '../components';
import * as Actions from '../actions';

class ChildProtectionCategoryList extends Component {
    render() {
        return <ChildProtectionCategoryListView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
    loadCategoryDetails: (data) => dispatch(Actions.loadCategoryDetails(data)),
    // navigateToChildProtectionCategoryDetails: (data) => dispatch(Actions.navigateToChildProtectionCategoryDetails(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildProtectionCategoryList);