import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,


    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_CATEGORIES_REQUEST,
    PRODUCT_CATEGORIES_SUCCESS,
    PRODUCT_CATEGORIES_FAIL,
    PRODUCT_CATEGORY_DETAILS_REQUEST,
    PRODUCT_CATEGORY_DETAILS_SUCCESS,
    PRODUCT_CATEGORY_DETAILS_FAIL,
    PRODUCT_CATEGORY_DELETE_REQUEST,
    PRODUCT_CATEGORY_DELETE_SUCCESS,
    PRODUCT_CATEGORY_DELETE_FAIL,
    PRODUCT_CATEGORY_CREATE_REQUEST,
    PRODUCT_CATEGORY_CREATE_SUCCESS,
    PRODUCT_CATEGORY_CREATE_FAIL,
    PRODUCT_CATEGORY_UPDATE_REQUEST,
    PRODUCT_CATEGORY_UPDATE_SUCCESS,
    PRODUCT_CATEGORY_UPDATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CATEGORY_CREATE_RESET,
    PRODUCT_CATEGORY_UPDATE_RESET,

} from '../constants/productConstants'

const productTopRequest = () => {
    return { type: PRODUCT_TOP_REQUEST }
}

const productTopSuccess = (data) => {
    return {
        type: PRODUCT_TOP_SUCCESS,
        payload: data
    }
}

const productTopFail = (data) => {
    return {
        type: PRODUCT_TOP_FAIL,
        payload: data,
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch(productTopRequest())

        const { data } = await axios.get(`/api/products/top/`)

        dispatch(productTopSuccess(data))

    } catch (error) {
        dispatch(productTopFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productListRequest = () => {
    return { type: PRODUCT_LIST_REQUEST }
}

const productListSuccess = (data) => {
    return {
        type: PRODUCT_LIST_SUCCESS,
        payload: data
    }
} 

const productListFail = (data) => {
    return {
        type: PRODUCT_LIST_FAIL,
        payload: data
    }
}

export const filterProducts = (params) => async (dispatch) => {
    try {
        dispatch(productListRequest())

        const { data } = await axios.post(`/api/products/filter/`, { category: params.category, is_available: params.is_available, brand: params.brand })

        dispatch(productListSuccess(data))

    } catch (error) {
        dispatch(productListFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productDetailsRequest = () => {
    return {
        type: PRODUCT_DETAILS_REQUEST
    }
}

const productDetailsSuccess = (data) => {
    return {
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data
    }
}

const productDetailsFail = (data) => {
    return {
        type: PRODUCT_DETAILS_FAIL,
        payload: data
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest())

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch(productDetailsSuccess(data))

    } catch (error) {
        dispatch(productDetailsFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productDeleteRequest = () => {
    return {
        type: PRODUCT_DELETE_REQUEST
    }
}

const productDeleteSuccess = () => {
    return {
        type: PRODUCT_DELETE_SUCCESS,
    }
}

const productDeleteFail = (data) => {
    return {
        type: PRODUCT_DELETE_FAIL,
        payload: data
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch(productDeleteRequest())

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
            `/api/products/delete/${id}/`,
            config
        )

        dispatch(productDeleteSuccess())


    } catch (error) {
        dispatch(productDeleteFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}


const createProductRequest = () => {
    return {
        type: PRODUCT_CREATE_REQUEST
    }
}

const createProductSuccess = (data) => {
    return {
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
    }
}

const createProductFail = (data) => {
    return {
        type: PRODUCT_CREATE_FAIL,
        payload: data,
    }
}

export const productCreateReset = () => {
    return {
        type: PRODUCT_CREATE_RESET
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch(createProductRequest())

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
            `/api/products/create/`,
            {},
            config
        )
        dispatch(createProductSuccess(data))


    } catch (error) {
        dispatch(createProductFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productCategoryUpdateRequest = () => {
    return {
        type: PRODUCT_CATEGORY_UPDATE_REQUEST
    }
}

const productCategoryUpdateSuccess = (data) => {
    return {
        type: PRODUCT_CATEGORY_UPDATE_SUCCESS,
        payload: data,
    }
}

const productCategoryUpdateFail = (data) => {
    return {
        type: PRODUCT_CATEGORY_UPDATE_FAIL,
        payload: data,
    }
}

export const productCategoryUpdateReset = () => {
    return {
        type: PRODUCT_CATEGORY_UPDATE_RESET
    }
}

export const updateProductCategory = (product) => async (dispatch, getState) => {
    try {
        dispatch(productCategoryUpdateRequest())

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
            `/api/products/category/update/${product._id}/`,
            product,
            config
        )
        dispatch(productCategoryUpdateSuccess(data))


        dispatch(productCategoryDetailsSuccess(data))


    } catch (error) {
        dispatch(productCategoryUpdateFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productCreateReviewRequest = () => {
    return {
        type: PRODUCT_CREATE_REVIEW_REQUEST
    }
}

const productCreateReviewSuccess = (data) => {
    return {
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
        payload: data,
    }
}

const productCreateReviewFail = (data) => {
    return {
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: data,
    }
}

export const productCreateReviewReset = () => {
    return {
        type: PRODUCT_CREATE_REVIEW_RESET
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch(productCreateReviewRequest())

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
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch(productCreateReviewSuccess(data))



    } catch (error) {
        dispatch(productCreateReviewFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productCategoriesRequest = () => {
    return { type: PRODUCT_CATEGORIES_REQUEST }
}

const productCategoriesSuccess = (data) => {
    return {
        type: PRODUCT_CATEGORIES_SUCCESS,
        payload: data
    }
}

const productCategoriesFail = (data) => {
    return {
        type: PRODUCT_CATEGORIES_FAIL,
        payload: data,
    }
}

export const getProductCategoryList = () => async (dispatch) => {
    try {
        dispatch(productCategoriesRequest())

        const { data } = await axios.get(`/api/products/categories/`)

        dispatch(productCategoriesSuccess(data))

    } catch (error) {
        dispatch(productCategoriesFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productCategoryDetailsRequest = () => {
    return { type: PRODUCT_CATEGORY_DETAILS_REQUEST }
}

const productCategoryDetailsSuccess = (data) => {
    return {
        type: PRODUCT_CATEGORY_DETAILS_SUCCESS,
        payload: data
    }
}

const productCategoryDetailsFail = (data) => {
    return {
        type: PRODUCT_CATEGORY_DETAILS_FAIL,
        payload: data,
    }
}

export const getProductCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch(productCategoryDetailsRequest())

        const { data } = await axios.get(`/api/products/category/${id}`)

        dispatch(productCategoryDetailsSuccess(data))

    } catch (error) {
        dispatch(productCategoryDetailsFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productCategoryDeleteRequest = () => {
    return {
        type: PRODUCT_CATEGORY_DELETE_REQUEST
    }
}

const productCategoryDeleteSuccess = () => {
    return {
        type: PRODUCT_CATEGORY_DELETE_SUCCESS,
    }
}

const productCategoryDeleteFail = (data) => {
    return {
        type: PRODUCT_CATEGORY_DELETE_FAIL,
        payload: data,
    }
} 

export const deleteProductCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch(productCategoryDeleteRequest())

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

        dispatch(productCategoryDeleteSuccess())


    } catch (error) {
        dispatch(productCategoryDeleteFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productCategoryCreateRequest = () => {
    return {
        type: PRODUCT_CATEGORY_CREATE_REQUEST
    }
}

const productCategoryCreateSuccess = (data) => {
    return {
        type: PRODUCT_CATEGORY_CREATE_SUCCESS,
        payload: data,
    }
}

const productCategoryCreateFail = (data) => {
    return {
        type: PRODUCT_CATEGORY_CREATE_FAIL,
        payload: data,
    }
}

export const productCategoryCreateReset = () => {
    return {
        type: PRODUCT_CATEGORY_CREATE_RESET
    }
}

export const createProductCategory = () => async (dispatch, getState) => {
    try {
        dispatch(productCategoryCreateRequest())

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
            `/api/products/category/create/`,
            {},
            config
        )
        dispatch(productCategoryCreateSuccess(data))


    } catch (error) {
        dispatch(productCategoryCreateFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}

const productUpdateRequest = () => {
    return {
        type: PRODUCT_UPDATE_REQUEST
    }
}

const productUpdateSuccess = (data) => {
    return {
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
    }
}

const productUpdateFail = (data) => {
    return {
        type: PRODUCT_UPDATE_FAIL,
        payload: data,
    }
}

export const productUpdateReset = () => {
    return { 
        type: PRODUCT_UPDATE_RESET 
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch(productUpdateRequest())

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
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        dispatch(productUpdateSuccess(data))


        dispatch(productDetailsSuccess(data))


    } catch (error) {
        dispatch(productUpdateFail(error.response && error.response.data.detail ? error.response.data.detail: error.message))
    }
}
