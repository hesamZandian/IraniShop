import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,

} from '../constants/userConstants'
import produce from 'immer'

const initial_state = {
    userLogin: {
        loading: false,
        userInfo: null,
        error: ''
    },
    userRegister: {
        loading: false,
        userInfo: null,
        error: ''
    },    
    userDetails: {
        loading: false,
        user: null,
        error: ''
    },
    userUpdateProfile: {
        loading: false,
        userInfo: null,
        error: '',
        success: false
    },
    userList: {
        loading: false,
        users: [],
        error: ''
    },
    userDelete: {
        loading: false,
        success: false,
        error: ''
    },
    userUpdate: {
        loading: false,
        success: false,
        error: '',
        user:  null
    }
}

const reducer = (state = initial_state, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case USER_LOGIN_REQUEST:
                draft.userLogin.loading = true;
                break;
            case USER_LOGIN_SUCCESS:
                draft.userLogin.userInfo = action.payload;
                draft.userLogin.loading = false;
                break;   
            case USER_LOGIN_FAIL:
                draft.userLogin.error = action.payload;
                draft.userLogin.loading = false;
                break;
            case USER_LOGOUT:
                draft.userLogin.loading = false;
                draft.userLogin.userInfo = null;
                draft.error = '';
                break;    
        
            case USER_REGISTER_REQUEST:
                draft.userRegister.loading = true;
                break;
            case USER_REGISTER_SUCCESS:
                draft.userRegister.userInfo = action.payload;
                draft.userRegister.loading = false;
                break;
            case USER_REGISTER_FAIL:
                draft.userRegister.error = action.payload;
                draft.userRegister.loading = false;
                break;  

            case USER_DETAILS_REQUEST:
                draft.userDetails.loading = true;
                break;
            case USER_DETAILS_SUCCESS:
                draft.userDetails.user = action.payload;
                draft.userDetails.loading = false;
                break;
            case USER_DETAILS_FAIL:
                draft.userDetails.error = action.payload;
                draft.userDetails.loading = false;
                break;
            case USER_DETAILS_RESET:
                draft.userDetails.user = null;
                draft.userDetails.loading = false;
                draft.userDetails.error = '';
                break;
            case USER_UPDATE_PROFILE_REQUEST:
                draft.userUpdateProfile.loading = true;
                break;
            case USER_UPDATE_PROFILE_SUCCESS:
                draft.userUpdateProfile.success = true;
                draft.userUpdateProfile.userInfo = action.payload;
                draft.userUpdateProfile.loading = false;
                break; 
            case USER_UPDATE_PROFILE_FAIL:
                draft.userUpdateProfile.error = action.payload;
                draft.userUpdateProfile.loading = false;
                break;
            case USER_UPDATE_PROFILE_RESET:
                draft.userUpdateProfile.loading = false;
                draft.userUpdateProfile.success = false;
                draft.userUpdateProfile.userInfo = null;
                draft.userUpdateProfile.error = '';
                break;

            case USER_LIST_REQUEST:
                draft.userList.loading = true;
                break;
            case USER_LIST_SUCCESS:
                draft.userList.users = action.payload;
                draft.userList.loading = false;
                break;
            case USER_LIST_FAIL:
                draft.userList.error = action.payload;
                draft.userList.loading = false;
                break;
            case USER_LIST_RESET:
                draft.userList.loading = false;
                draft.userList.users = [];
                draft.userList.error = '';
                break;                
                    
            case USER_DELETE_REQUEST:
                draft.userDelete.loading = true;
                break;
            case USER_DELETE_SUCCESS:
                draft.userDelete.success = true;
                draft.userDelete.loading = false;
                break;    
            case USER_DELETE_FAIL:
                draft.userDelete.error = action.payload;
                draft.userDelete.loading = false;
                break; 
            case USER_UPDATE_REQUEST:
                draft.userUpdate.loading = true;
                break;
            case USER_UPDATE_SUCCESS:
                draft.userUpdate.success = true;
                draft.userUpdate.loading = false;
                break;
            case USER_UPDATE_FAIL:
                draft.userUpdate.error = action.payload;
                draft.userUpdate.loading = false;
                break;
            case USER_UPDATE_RESET:
                draft.userUpdate.user = null;
                draft.userUpdate.loading = false;
                draft.userUpdate.success = false;
                draft.userUpdate.error = '';
                break;

            default: break;
        }
    })
}

export default reducer;