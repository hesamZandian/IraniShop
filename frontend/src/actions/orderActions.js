import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_CREATE_RESET,
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

const orderCreateRequest = () => {
    return {
        type: ORDER_CREATE_REQUEST
    }
}

const orderCreateSuccess = (data) => {
    return {
        type: ORDER_CREATE_SUCCESS,
        payload: data
    }
}

const orderCreateFail = (data) => {
    return {
        type: ORDER_CREATE_FAIL,
        payload: data,
    }
}

export const createOrderReset = (data) => {
    return {
        type: ORDER_CREATE_RESET,
        payload: data,
    }
}

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(orderCreateRequest())

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

        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        dispatch(orderCreateSuccess(data))

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')


    } catch (error) {
        dispatch(orderCreateFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const orderDetailsRequest = () => {
    return {
        type: ORDER_DETAILS_REQUEST
    }
}

const orderDetailsSuccess = (data) => {
    return {
        type: ORDER_DETAILS_SUCCESS,
        payload: data
    }
}

const orderDetailsFail = (data) => {
    return {
        type: ORDER_DETAILS_FAIL,
        payload: data,
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(orderDetailsRequest())

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
            `/api/orders/${id}/`,
            config
        )

        dispatch(orderDetailsSuccess(data))


    } catch (error) {
        dispatch(orderDetailsFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const orderPayRequest = () => {
    return {
        type: ORDER_PAY_REQUEST
    }
}

const orderPaySuccess = (data) => {
    return {
        type: ORDER_PAY_SUCCESS,
        payload: data
    }
}

const orderPayFail = (data) => {
    return {
        type: ORDER_PAY_FAIL,
        payload: data,
    }
}

export const orderPayReset = () => {
    return {
        type: ORDER_PAY_RESET
    }
}
 
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch(orderPayRequest())

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
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch(orderPaySuccess(data))


    } catch (error) {
        dispatch(orderPayFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const orderDeliverRequest = () => {
    return {
        type: ORDER_DELIVER_REQUEST
    }
}

const orderDeliverSuccess = (data) => {
    return {
        type: ORDER_DELIVER_SUCCESS,
        payload: data
    }
}

const orderDeliverFail = (data) => {
    return {
        type: ORDER_DELIVER_FAIL,
        payload: data,
    }
}

export const orderDeliverReset = () => {
    return {
        type: ORDER_DELIVER_RESET
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(orderDeliverRequest())

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
            `/api/orders/${order._id}/deliver/`,
            {},
            config
        )

        dispatch(orderDeliverSuccess(data))


    } catch (error) {
        dispatch(orderDeliverFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const orderListMyRequest = () => {
    return {
        type: ORDER_LIST_MY_REQUEST
    }
}

const orderListMySuccess = (data) => {
    return {
        type: ORDER_LIST_MY_SUCCESS,
        payload: data
    }
}

const orderListMyFail = (data) => {
    return {
        type: ORDER_LIST_MY_FAIL,
        payload: data,
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderListMyRequest())

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
            `/api/orders/myorders/`,
            config
        )

        dispatch(orderListMySuccess(data))


    } catch (error) {
        dispatch(orderListMyFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const orderListRequest = () => {
    return {
        type: ORDER_LIST_REQUEST
    }
}

const orderListSuccess = (data) => {
    return {
        type: ORDER_LIST_SUCCESS,
        payload: data
    }
}

const orderListFail = (data) => {
    return {
        type: ORDER_LIST_FAIL,
        payload: data,
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderListRequest())

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
            `/api/orders/`,
            config
        )

        dispatch(orderListSuccess(data))


    } catch (error) {
        dispatch(orderListFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}