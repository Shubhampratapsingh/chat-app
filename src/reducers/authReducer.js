import { authConstants } from '../actions/type';

const initialState = {
    firstName: '',
    lastName: '',
    summary: '',
    email: '',
    authenticating: false,
    authenticated: false,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.USER_LOGIN_REQUEST:
            return state ={
                ...state,
                authenticating : true
            }
        case authConstants.USER_LOGIN_SUCCESS:
            return state = {
                ...state,
                ...action.payload.user,
                authenticated : true,
                authenticating : false
            }
        case authConstants.USER_LOGIN_FAILURE:
            return state = {
                ...state,
                error : action.payload.error,
                authenticating : false,
                authenticated : false
            }
            
        case authConstants.USER_LOGOUT_SUCCESS :
            return state ={
                ...initialState
            }
        case authConstants.USER_LOGOUT_FAILURE :
            return state = {
                ...state,
                error : action.payload.error
            }
        default:
            return state;
    }
}
export default authReducer;