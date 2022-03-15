import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ChildProtectionSystemListView } from '../components';
import * as Actions from '../actions';

class ChildProtectionSystemList extends Component {
    render() {
        return <ChildProtectionSystemListView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
    loadChildProtectionCategory: (data) => dispatch(Actions.loadChildProtectionCategory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildProtectionSystemList);