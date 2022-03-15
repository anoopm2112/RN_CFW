
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import { getDeveloperOptions } from '../selectors';
import { DeveloperOptionView } from '../components';

class DeveloperOptions extends React.Component {
    render() {
        return (
            <DeveloperOptionView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    developerOptions: getDeveloperOptions,
});

const mapDispatchToProps = dispatch => ({
    setDeveloperOptions: (data) => dispatch(Actions.setDeveloperOptions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperOptions);
