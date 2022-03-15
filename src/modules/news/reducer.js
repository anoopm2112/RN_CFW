import { types as ActionTypes } from './actions';

const initialState = {
    newsList: {
        data: [],
        refreshing: true
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_NEWS_LIST_API_REQUEST:
            return Object.assign({}, state, {
                newsList: {
                    refreshing: true
                }
            });
        case ActionTypes.FETCH_NEWS_LIST_API_SUCCESS:
            return Object.assign({}, state, {
                newsList: {
                    data: action.payload.data || [],
                    refreshing: false
                }
            });
        case ActionTypes.FETCH_NEWS_LIST_API_REQUEST:
            return Object.assign({}, state, {
                newsList: {
                    refreshing: false
                }
            });
        default:
            return state;
    }
};
