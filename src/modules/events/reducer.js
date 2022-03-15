import { types as ActionTypes } from './actions';

const initialState = {
    upcomingEvents: {
        data: [],
        refreshing: true
    },
    myEvents: {
        data: [],
        refreshing: true
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_UPCOMING_EVENTS:
            return Object.assign({}, state, {
                upcomingEvents: {
                    data: action.payload.data || [],
                    refreshing: false
                }
            });
        case ActionTypes.LOAD_MY_EVENTS_API_REQUEST:
            return Object.assign({}, state, {
                myEvents: {
                    data: [],
                    refreshing: true
                }
            });
        case ActionTypes.LOAD_MY_EVENTS_API_SUCCESS:
            return Object.assign({}, state, {
                myEvents: {
                    data: action.payload.data || [],
                    refreshing: false
                }
            });
        case ActionTypes.LOAD_MY_EVENTS_API_FAILED:
            return Object.assign({}, state, {
                myEvents: {
                    data: [],
                    refreshing: false
                }
            });
        default:
            return state;
    }
};
