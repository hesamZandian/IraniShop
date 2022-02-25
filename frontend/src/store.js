import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productReducer from './reducers/productReducers'

import cartReducer from './reducers/cartReducers'

import userReducer from './reducers/userReducers'

import orderReducer from './reducers/orderReducers'

import brandReducer from './reducers/brandReducers'

const reducer = combineReducers({
    products: productReducer,
    brands: brandReducer,
    cart: cartReducer,
    user: userReducer,
    orders: orderReducer
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}



const user_initial_state = {
    userLogin: {
        loading: false,
        userInfo: userInfoFromStorage,
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

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
   user: user_initial_state,
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store