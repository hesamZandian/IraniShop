import axios from 'axios'
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
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_RESET,

} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

const userLoginRequest = () => {
    return {
        type: USER_LOGIN_REQUEST
    }
}

const userLoginSuccess = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data
    }
}

const userLoginFail = (data) => {
    return {
        type: USER_LOGIN_FAIL,
        payload: data
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(userLoginRequest())

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(userLoginFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const userLogout = () => ({ type: USER_LOGOUT })
const userDetailsReset = () => ({ type: USER_DETAILS_RESET })
const orderListMyReset = () => ({ type: ORDER_LIST_MY_RESET })
const userListReset = () => ({ type: USER_LIST_RESET })
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(userLogout())
    dispatch(userDetailsReset())
    dispatch(orderListMyReset())
    dispatch(userListReset())
}

const userRegisterRequest = () => {
    return {
        type: USER_REGISTER_REQUEST
    }
}

const userRegisterSuccess = (data) => {
    return {
        type: USER_REGISTER_SUCCESS,
        payload: data
    }
}

const userRegisterFail = (data) => {
    return {
        type: USER_REGISTER_FAIL,
        payload: data,
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch(userRegisterRequest())

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        )

        dispatch(userRegisterSuccess(data))

        dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(userRegisterFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const userDetailsRequest = () => {
    return {
        type: USER_DETAILS_REQUEST
    }
}

const userDetailsSuccess = (data) => {
    return {
        type: USER_DETAILS_SUCCESS,
        payload: data
    }
}

const userDetailsFail = (data) => {
    return {
        type: USER_DETAILS_FAIL,
        payload: data,
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(userDetailsRequest())

        const {
            user: { 
                userLogin: { userInfo }
            },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch(userDetailsSuccess(data))


    } catch (error) {
        dispatch(userDetailsFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const userUpdateProfileRequest = () => {
    return {
        type: USER_UPDATE_PROFILE_REQUEST
    }
}

const userUpdateProfileSuccess = (data) => {
    return {
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data
    }
}

const userUpdateProfileFail = (data) => {
    return {
        type: USER_UPDATE_PROFILE_FAIL,
        payload: data,
    }
}

export const userUpdateProfileReset = () => {
    return {
        type: USER_UPDATE_PROFILE_RESET
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch(userUpdateProfileRequest())

        const {
            user: { 
                userLogin: { userInfo }
            }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )

        dispatch(userUpdateProfileSuccess(data))

        dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(userUpdateProfileFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const userListRequest = () => {
    return {
        type: USER_LIST_REQUEST
    }
}

const userListSuccess = (data) => {
    return {
        type: USER_LIST_SUCCESS,
        payload: data
    }
}

const userListFail = (data) => {
    return {
        type: USER_LIST_FAIL,
        payload: data,
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch(userListRequest())

        const {
            user: { 
                userLogin: { userInfo }
            }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/`,
            config
        )

        dispatch(userListSuccess(data))


    } catch (error) {
        dispatch(userListFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const userDeleteRequest = () => {
    return {
        type: USER_DELETE_REQUEST
    }
}

const userDeleteSuccess = (data) => {
    return {
        type: USER_DELETE_SUCCESS,
        payload: data
    }
}

const userDeleteFail = (data) => {
    return {
        type: USER_DELETE_FAIL,
        payload: data,
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch(userDeleteRequest())

        const {
            user: { 
                userLogin: { userInfo }
            }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/users/delete/${id}/`,
            config
        )

        dispatch(userDeleteSuccess(data))


    } catch (error) {
        dispatch(userDeleteFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const userUpdateRequest = () => {
    return {
        type: USER_UPDATE_REQUEST
    }
}

const userUpdateSuccess = () => {
    return {
        type: USER_UPDATE_SUCCESS,
    }
}

const userUpdateFail = (data) => {
    return {
        type: USER_UPDATE_FAIL,
        payload: data,
    }
}

export const userUpdateReset = () => {
    return {
        type: USER_UPDATE_RESET
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch(userUpdateRequest())

        const {
            user: { 
                userLogin: { userInfo }
            }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )

        dispatch(userUpdateSuccess())

        dispatch(userDetailsSuccess(data))


    } catch (error) {
        dispatch(userUpdateFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}