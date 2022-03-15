import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomerSummaryView } from '../components';

class CustomerSummary extends Component {
    render() {
        return (
            <CustomerSummaryView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSummary);
