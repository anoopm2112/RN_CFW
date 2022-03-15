import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserTypeSelectionView } from '../components';
import * as Actions from '../actions';

class UserTypeSelection extends Component {

    render() {
        return (
            <UserTypeSelectionView {...this.props} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    navigateToLogin: () => dispatch(Actions.navigateToLogin()),
    userTypeThemeSelection: (data) => dispatch(Actions.userTypeThemeSelection(data))
});

export default connect(null, mapDispatchToProps)(UserTypeSelection);
