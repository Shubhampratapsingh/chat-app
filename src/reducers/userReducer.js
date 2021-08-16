import { userConstants } from '../actions/type';

const initialState = {
    users : [],
    conversations : []
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case userConstants.GET_USERS_SUCCESS :
            return state = {
                ...state,
                users: action.payload.users
            }
        case userConstants.GET_MESSAGES:
            return state ={
                ...state,
                conversations : action.payload.conversations
            }
        default:
            return state;
    }
};

export default userReducer;