import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ChildProtectionCategoryDetailView } from '../components';

class ChildProtectionCategoryDetail extends Component {
    render() {
        return <ChildProtectionCategoryDetailView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChildProtectionCategoryDetail);