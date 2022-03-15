import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NewsListView } from '../components';
import { navigateToNewsDetailsScreen, loadNewsList } from '../actions';
import { getNewsList } from '../selectors';
import { getUserType } from '../../user/selectors';

class NewsList extends Component {
    render() {
        return <NewsListView {...this.props} />;
    }
}

const mapStateToProps = createStructuredSelector({
    newsList: getNewsList,
    userType: getUserType
});

const mapDispatchToProps = dispatch => ({
    navigateToNewsDetailsScreen: (data) => dispatch(navigateToNewsDetailsScreen(data)),
    loadNewsList: (data) => dispatch(loadNewsList(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);