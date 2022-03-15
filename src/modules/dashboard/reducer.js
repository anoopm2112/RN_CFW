import { actions as CommonActions } from '../../common';
const { types: CommonActionsTypes } = CommonActions;
import { types as ActionTypes } from './actions';

const initialState = {
    sideBar: {
        currentRoute: undefined,
        logoutModal: {
            enabled: false,
            message: undefined
        }
    },
    qrcode: {
        initializer: {
            params: undefined,
            scanFinishedAction: undefined
        }
    },
    notification: {
        refreshing: true,
        data: [],
        page: -1
    },
    playstoreAppData: {
        data: undefined,
        updateApp: false
    },
    needsUpdate: false,
    drawerStatus: false,
    homeFeed: {
        data: [],
        refreshing: true,
        page: -1
    },
    pushNotifications: undefined,
    tollFreeNumber: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CommonActionsTypes.ROUTE_CHANGED:
            return Object.assign({}, state, {
                sideBar: {
                    ...state.sideBar,
                    currentRoute: action.payload.name
                }
            });
        case ActionTypes.INITIALIZE_QRCODE_SCANNER:
            return Object.assign({}, state, {
                qrcode: {
                    initializer: action.payload.data
                }
            });
        // case ActionTypes.LOAD_NOTIFICATION:
        //     return Object.assign({}, state, {
        //         notification: {
        //             ...state.notification,
        //             refreshing: true
        //         }
        //     });
        case ActionTypes.NOTIFICATION_LIST_API_SUCCESS:
            const newPageCount = state.notification.page + 1;
            const notificationData = [];
            if (newPageCount > 0 && state.notification.data.length) {
                notificationData.push(...state.notification.data);
            }
            notificationData.push(...action.payload.data.content);
            return Object.assign({}, state, {
                notification: {
                    ...state.notification,
                    refreshing: false,
                    page: newPageCount,
                    data: notificationData
                }
            });
        // return Object.assign({}, state, {
        //     notification: {
        //         ...state.notification,
        //         refreshing: true
        //     }
        // });

        case ActionTypes.SET_NOTIFICATION:
            return Object.assign({}, state, {
                notification: {
                    refreshing: false,
                    data: action.payload.data || []
                }
            });
        case ActionTypes.TOGGLE_LOGOUT_MODAL:
            return Object.assign({}, state, {
                sideBar: {
                    ...state.sideBar,
                    logoutModal: action.payload.data
                }
            });
        case ActionTypes.SET_PLAYSTORE_APP_VERSION_DATA:
            return Object.assign({}, state, {
                playstoreAppData: {
                    updateApp: action.payload.data
                }
            });
        case ActionTypes.CHECK_APP_UPDATE:
            return Object.assign({}, state, {
                needsUpdate: action.payload.data
            });
        case ActionTypes.DRAWER_STATUS:
            return Object.assign({}, state, {
                drawerStatus: action.payload.data
            });
        case ActionTypes.LOAD_HOME_FEED_API_REQUEST:
            return Object.assign({}, state, {
                homeFeed: {
                    ...state.homeFeed,
                    refreshing: true
                }
            });
        case ActionTypes.LOAD_HOME_FEED_API_SUCCESS:
            const newPage = state.homeFeed.page + 1;
            const homeFeedData = [];
            if (newPage > 0 && state.homeFeed.data.length) {
                homeFeedData.push(...state.homeFeed.data);
            }
            homeFeedData.push(...action.payload.data.content);
            return Object.assign({}, state, {
                homeFeed: {
                    ...state.homeFeed,
                    refreshing: false,
                    page: newPage,
                    data: homeFeedData
                }
            });
        case ActionTypes.LOAD_HOME_FEED_API_FAILED:
            return Object.assign({}, state, {
                homeFeed: {
                    ...state.homeFeed,
                    refreshing: false
                }
            });
        case ActionTypes.RESET_HOME_FEED_PAGE:
            return Object.assign({}, state, {
                homeFeed: {
                    ...state.homeFeed,
                    page: initialState.homeFeed.page
                }
            });
        case ActionTypes.NOTIFICATIONS:
            return Object.assign({}, state, {
                pushNotifications: action.payload.data
            });
        case ActionTypes.SET_TOLLFREE_NUMBERS:
            return Object.assign({}, state, {
                tollFreeNumber: action.payload.data
            });
        case ActionTypes.RESET_NOTIFICATION_PAGE:
            return Object.assign({}, state, {
                notification: {
                    ...state.notification,
                    page: initialState.notification.page
                }
            });
        default:
            return state;
    }
};
