import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

const cartAddItem = (data) => {
    return {
        type: CART_ADD_ITEM,
        payload: data
    }
}

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(cartAddItem({
        product: data.product._id,
        name: data.product.name,
        image: data.product.image,
        price: data.product.price,
        countInStock: data.product.countInStock,
        qty
    }))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const cartRemoveItem = (data) => {
    return {
        type: CART_REMOVE_ITEM,
        payload: data
    }
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch(cartRemoveItem(id))

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const cartSaveShippingAddress = (data) => {
    return {
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    }
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch(cartSaveShippingAddress(data))

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

const cartSavePaymentMethod = (data) => {
    return {
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    }
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch(cartSavePaymentMethod(data))

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}