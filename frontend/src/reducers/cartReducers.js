import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'
import produce from 'immer'

const initial_state = { 
    cartItems: [], 
    shippingAddress: {},
    paymentMethod: null
}

const reducer = (state = initial_state, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case CART_ADD_ITEM:
                const item = action.payload
                const existItem = draft.cartItems.find(x => x.product === item.product)
    
                if (existItem) {
                    draft.cartItems = draft.cartItems.map(x => x.product === existItem.product ? item : x)
                } else {
                    draft.cartItems = [...state.cartItems, item];
                }
                break;
            case CART_REMOVE_ITEM:
                draft.cartItems = draft.cartItems.filter(x => x.product !== action.payload)
                break;
            case CART_SAVE_SHIPPING_ADDRESS:
                draft.shippingAddress = action.payload;
                break;
            case CART_SAVE_PAYMENT_METHOD:
                draft.paymentMethod = action.payload;
                break;
            case CART_CLEAR_ITEMS:
                draft.cartItems = []
                break;
            default: break;
        }
    })
}

export default reducer