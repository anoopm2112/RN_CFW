import { types as ActionTypes } from './actions';

const initialState = {
    allServices: {
        allSubscriptionData: [],
        refreshing: true
    },
    myServices: {
        data: [],
        refreshing: true
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_ALL_SERVICES:
            return Object.assign({}, state, {
                allServices: {
                    allSubscriptionData: action.payload.data || [],
                    refreshing: false
                }
            });
        case ActionTypes.LOAD_MY_SERVICE_API_REQUEST:
            return Object.assign({}, state, {
                myServices: {
                    data: [],
                    refreshing: true
                }
            });
        case ActionTypes.LOAD_MY_SERVICE_API_SUCCESS:
            return Object.assign({}, state, {
                myServices: {
                    data: action.payload.data || [],
                    refreshing: false
                }
            });
        case ActionTypes.LOAD_MY_SERVICE_API_FAILED:
            return Object.assign({}, state, {
                myServices: {
                    data: [],
                    refreshing: false
                }
            });
        default:
            return state;
    }
};
