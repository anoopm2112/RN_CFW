import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ContentsListView } from '../components';
import { navigateToContentDetailsScreen, loadContentList } from '../actions';
import { getContentList } from '../selectors';
import { getUserType } from '../../user/selectors';

class ContentsList extends Component {
    render() {
        return <ContentsListView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    contentList: getContentList,
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({
    navigateToContentDetailsScreen: (data) => dispatch(navigateToContentDetailsScreen(data)),
    loadContentList: (data) => dispatch(loadContentList(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentsList);