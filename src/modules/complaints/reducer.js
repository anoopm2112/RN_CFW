import { types as ActionTypes } from './actions';

const initialState = {
    complaintImage: undefined,
    complaintLocation: undefined,
    complaintListData: {
        data: [],
        refreshing: true
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.COMPLAINT_IMAGE:
            return Object.assign({}, state, {
                complaintImage: action.payload.data
            });
        case ActionTypes.COMPLAINT_LOCATION:
            return Object.assign({}, state, {
                complaintLocation: action.payload.data
            });
        case ActionTypes.COMPLAINT_LIST_API_REQUEST:
            return Object.assign({}, state, {
                complaintListData: {
                    data: [],
                    refreshing: true
                }
            });
        case ActionTypes.COMPLAINT_LIST_API_SUCCESS:
            return Object.assign({}, state, {
                complaintListData: {
                    data: action.payload.data,
                    refreshing: false
                }
            });
        case ActionTypes.COMPLAINT_LIST_API_FAILED:
            return Object.assign({}, state, {
                complaintListData: {
                    data: [],
                    refreshing: false
                }
            });
        default:
            return state;
    }
};
