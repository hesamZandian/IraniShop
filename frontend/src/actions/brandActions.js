import axios from "axios";
import { BRAND_CREATE_FAIL, BRAND_CREATE_REQUEST, BRAND_CREATE_RESET, BRAND_CREATE_SUCCESS, BRAND_DELETE_FAIL, BRAND_DELETE_REQUEST, BRAND_DELETE_SUCCESS, BRAND_DETAILS_FAIL, BRAND_DETAILS_REQUEST, BRAND_DETAILS_SUCCESS, BRAND_LIST_FAIL, BRAND_LIST_REQUEST, BRAND_LIST_SUCCESS, BRAND_UPDATE_FAIL, BRAND_UPDATE_REQUEST, BRAND_UPDATE_RESET, BRAND_UPDATE_SUCCESS } from "../constants/brandConstants";

const brandListRequest = () => {
    return {
        type: BRAND_LIST_REQUEST
    }
}

const brandListSuccess = (data) => {
    return {
        type: BRAND_LIST_SUCCESS,
        payload: data
    }
}

const brandListFail = (data) => {
    return {
        type: BRAND_LIST_FAIL,
        payload: data,
    }
} 

export const getBrandsList = () => async (dispatch, getState) => {
    try {
        dispatch(brandListRequest())

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
        const { data } = await axios.get(`/api/products/brands/`, config)

        dispatch(brandListSuccess(data))

    } catch (error) {
        dispatch(brandListFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const brandDetailsRequest = () => {
    return {
        type: BRAND_DETAILS_REQUEST
    }
}

const brandDetailsSuccess = (data) => {
    return {
        type: BRAND_DETAILS_SUCCESS,
        payload: data
    }
}

const brandDetailsFail = (data) => {
    return {
        type: BRAND_DETAILS_FAIL,
        payload: data
    }
}

export const getBrandDetails = (id) => async (dispatch) => {
    try {
        dispatch(brandDetailsRequest())

        const { data } = await axios.get(`/api/products/brand/${id}`)

        dispatch(brandDetailsSuccess(data))

    } catch (error) {
        dispatch(brandDetailsFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const brandCreateRequest = () => {
    return {
        type: BRAND_CREATE_REQUEST
    }
}

const brandCreateSuccess = (data) => {
    return {
        type: BRAND_CREATE_SUCCESS,
        payload: data,
    }
}

const brandCreateFail = (data) => {
    return {
        type: BRAND_CREATE_FAIL,
        payload: data,
    }
}

export const createBrandReset = () => {
    return {
        type: BRAND_CREATE_RESET
    }
}

export const createBrand = () => async (dispatch, getState) => {
    try {
        dispatch(brandCreateRequest())

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
            `/api/products/brand/create/`,
            {},
            config
        )
        dispatch(brandCreateSuccess(data))


    } catch (error) {
        dispatch(brandCreateFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const brandUpdateRequest = () => {
    return {
        type: BRAND_UPDATE_REQUEST
    }
}

const brandUpdateSuccess = (data) => {
    return {
        type: BRAND_UPDATE_SUCCESS,
        payload: data,
    }
}

const brandUpdateFail = (data) => {
    return {
        type: BRAND_UPDATE_FAIL,
        payload: data
    }
}

export const updateBrandReset = () => {
    return {
        type: BRAND_UPDATE_RESET
    }
}

export const updateBrand = (brand) => async (dispatch, getState) => {
    try {
        dispatch(brandUpdateRequest())

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
            `/api/products/brand/update/${brand._id}/`,
            brand,
            config
        )
        dispatch(brandUpdateSuccess(data))


        dispatch(brandDetailsSuccess(data))


    } catch (error) {
        dispatch(brandUpdateFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const brandDeleteRequest = () => {
    return {
        type: BRAND_DELETE_REQUEST
    }
}

const brandDeleteSuccess = () => {
    return {
        type: BRAND_DELETE_SUCCESS
    }
}

const brandDeleteFail = (data) => {
    return {
        type: BRAND_DELETE_FAIL,
        payload: data,
    }
}

export const deleteBrand = (id) => async (dispatch, getState) => {
    try {
        dispatch(brandDeleteRequest())

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
// eslint-disable-next-line
        const { data } = await axios.delete(
            `/api/products/category/delete/${id}/`,
            config
        )

        dispatch(brandDeleteSuccess())


    } catch (error) {
        dispatch(brandDeleteFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}