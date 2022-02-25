import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import produce from 'immer'

const initial_state = {
    orderCreate: {
        loading: false,
        success: false,
        order: {},
        error: ''
    },
    orderDetails: {
        loading: false,
        order: {},
        error: '', 
        orderItems: [], 
        shippingAddress: {} 
    },
    orderPay: {
        loading: false,
        success: false,
        error: ''
    },
    myOrderList: {
        loading: false, 
        orders: [],
        error: '' 
    },
    orderList: {
        loading: false, 
        orders: [],
        error: '' 
    },
    orderDeliver: {
        loading: false,
        success: false,
        error: ''
    }
}

const reducer = (state = initial_state, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case ORDER_CREATE_REQUEST:
                draft.orderCreate.loading = true;
                break;
            case ORDER_CREATE_SUCCESS:
                draft.orderCreate.success = true;
                draft.orderCreate.order = action.payload;
                draft.orderCreate.loading = false;
                break;
            
            case ORDER_CREATE_FAIL:
                draft.orderCreate.error = action.payload;
                draft.orderCreate.loading = false;
                break;
            case ORDER_CREATE_RESET:
                draft.orderCreate.loading = false;
                draft.orderCreate.success = false;
                draft.orderCreate.order = {};
                draft.orderCreate.error = '';
                break;

            case ORDER_DETAILS_REQUEST:
                draft.orderDetails.loading = true;
                break;
            case ORDER_DETAILS_SUCCESS:
                draft.orderDetails.order = action.payload;
                draft.orderDetails.loading = false;
                break;
            case ORDER_DETAILS_FAIL:
                draft.orderDetails.error = action.payload;
                draft.orderDetails.loading = false;
                break;

            case ORDER_PAY_REQUEST:
                draft.orderPay.loading = true;
                break;
            case ORDER_PAY_SUCCESS:
                draft.orderPay.success = true;
                draft.orderPay.loading = false;
                break;
            case ORDER_PAY_FAIL:
                draft.orderPay.error = action.payload;
                draft.orderPay.loading = false;
                break;     
            case ORDER_PAY_RESET:
                draft.orderPay.loading = false;
                draft.orderPay.success = false;
                draft.orderPay.error = false;
                break;
            
            case ORDER_LIST_MY_REQUEST:
                draft.myOrderList.loading = true;
                break;
            case ORDER_LIST_MY_SUCCESS:
                draft.myOrderList.orders = action.payload;
                draft.myOrderList.loading = false;
                break;
            case ORDER_LIST_MY_FAIL:
                draft.myOrderList.error = action.payload;
                draft.myOrderList.loading = false;
                break;      
            case ORDER_LIST_MY_RESET:
                draft.myOrderList.loading = false;
                draft.myOrderList.orders = [];
                draft.myOrderList.error = '';
                break;
            
            case ORDER_LIST_REQUEST:
                draft.orderList.loading = true;
                break;
            case ORDER_LIST_SUCCESS:
                draft.orderList.orders = action.payload;
                draft.orderList.loading = false;
                break;
            case ORDER_LIST_FAIL:
                draft.orderList.error = action.payload;
                draft.orderList.loading = false;
                break;

            case ORDER_DELIVER_REQUEST:
                draft.orderDeliver.loading = true;
                break;  
            case ORDER_DELIVER_SUCCESS:
                draft.orderDeliver.success = true;
                draft.orderDeliver.loading = false;
                break;
            case ORDER_DELIVER_FAIL:
                draft.orderDeliver.error = action.payload;
                draft.orderDeliver.loading = false;
                break;
            case ORDER_DELIVER_RESET:
                draft.orderDeliver.loading = false;
                draft.orderDeliver.success = false;
                draft.orderDeliver.error = '';
                break;              
            default: break;
        }
    })
}

export default reducer;
// export const orderCreateReducer = (state = , action) => {
//     switch (action.type) {
//         case ORDER_CREATE_REQUEST:
//             return {
//                 loading: true
//             }

//         case ORDER_CREATE_SUCCESS:
//             return {
//                 loading: false,
//                 success: true,
//                 order: action.payload
//             }

//         case ORDER_CREATE_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }

//         case ORDER_CREATE_RESET:
//             return 


//         default:
//             return state
//     }
// }


// export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress:  }, action) => {
//     switch (action.type) {
//         case ORDER_DETAILS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }

//         case ORDER_DETAILS_SUCCESS:
//             return {
//                 loading: false,
//                 order: action.payload
//             }

//         case ORDER_DETAILS_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }


//         default:
//             return state
//     }
// }


// export const orderPayReducer = (state = , action) => {
//     switch (action.type) {
//         case ORDER_PAY_REQUEST:
//             return {
//                 loading: true
//             }

//         case ORDER_PAY_SUCCESS:
//             return {
//                 loading: false,
//                 success: true
//             }

//         case ORDER_PAY_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }

//         case ORDER_PAY_RESET:
//             return 

//         default:
//             return state
//     }
// }


// export const orderDeliverReducer = (state = , action) => {
//     switch (action.type) {
//         case ORDER_DELIVER_REQUEST:
//             return {
//                 loading: true
//             }

//         case ORDER_DELIVER_SUCCESS:
//             return {
//                 loading: false,
//                 success: true
//             }

//         case ORDER_DELIVER_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }

//         case ORDER_DELIVER_RESET:
//             return 

//         default:
//             return state
//     }
// }


// export const orderListMyReducer = (state = { orders: [] }, action) => {
//     switch (action.type) {
//         case ORDER_LIST_MY_REQUEST:
//             return {
//                 loading: true
//             }

//         case ORDER_LIST_MY_SUCCESS:
//             return {
//                 loading: false,
//                 orders: action.payload
//             }

//         case ORDER_LIST_MY_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }

//         case ORDER_LIST_MY_RESET:
//             return {
//                 orders: []
//             }

//         default:
//             return state
//     }
// }



// export const orderListReducer = (state = { orders: [] }, action) => {
//     switch (action.type) {
//         case ORDER_LIST_REQUEST:
//             return {
//                 loading: true
//             }

//         case ORDER_LIST_SUCCESS:
//             return {
//                 loading: false,
//                 orders: action.payload
//             }

//         case ORDER_LIST_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }
//         default:
//             return state
//     }
// }