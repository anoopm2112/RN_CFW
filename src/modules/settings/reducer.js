import { types as ActionTypes } from './actions';

const initialState = {
    developerOptions: {
        validations: true,
        autoSync: true
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_DEVELOPER_OPTIONS:
            return Object.assign({}, state, {
                developerOptions: {
                    ...state.developerOptions,
                    ...action.payload.data
                }
            });
           case ActionTypes.RESET_DEVELOPER_OPTIONS:
            return Object.assign({}, state, {
                developerOptions: {
                    ...initialState.developerOptions,
                }
            }); 
        default:
            return state;
    }
};
