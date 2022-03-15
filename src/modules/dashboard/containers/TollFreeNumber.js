import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TollFreeNumberView } from '../components';
import * as Actions from '../actions';
import { getTollFreeNumber } from '../selectors';

class TollFreeNumber extends Component {
    render() {
        return (
            <TollFreeNumberView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    tollFreeNumber: getTollFreeNumber
});

const mapDispatchToProps = (dispatch) => ({
    loadTollFreeNumbers: () => dispatch(Actions.loadTollFreeNumbers())
});

export default connect(mapStateToProps, mapDispatchToProps)(TollFreeNumber);
