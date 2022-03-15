import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { BalanidhiView } from '../components';

class Balanidhi extends Component {
    render() {
        return <BalanidhiView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Balanidhi);