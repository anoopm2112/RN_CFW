import { types as ActionTypes } from './actions';

const initialState = {
    contentList: {
        data: [],
        refreshing: true
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CONTENT_LIST_API_REQUEST:
            return Object.assign({}, state, {
                contentList: {
                    refreshing: true
                }
            });
        case ActionTypes.FETCH_CONTENT_LIST_API_SUCCESS:
            return Object.assign({}, state, {
                contentList: {
                    data: action.payload.data || [],
                    refreshing: false
                }
            });
        case ActionTypes.FETCH_CONTENT_LIST_API_FAILED:
            return Object.assign({}, state, {
                contentList: {
                    refreshing: false
                }
            });
        default:
            return state;
    }
};