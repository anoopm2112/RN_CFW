import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NotificationView } from '../components';
import { navigation } from '../../../common/actions';
import * as DashboardAction from '../actions';
import { getNotification } from '../selectors';

const { navigateBack } = navigation;

class Notification extends Component {

  render() {
    return (
      <NotificationView {...this.props} />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  notificationData: getNotification
});

const mapDispatchToProps = dispatch => ({
  navigateBack: () => { dispatch(navigateBack()) },
  loadNotification: (data) => dispatch(DashboardAction.loadNotification(data)),
  readNotification: (data) => dispatch(DashboardAction.readNotification(data)),
  filterUnreadNotifications: (data) => dispatch(DashboardAction.filterUnreadNotifications(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
