import produce from 'immer'
import { PRODUCT_CATEGORIES_FAIL, PRODUCT_CATEGORIES_REQUEST, PRODUCT_CATEGORIES_SUCCESS } from '../constants/productCategoryConstants';
const initial_state = {
    loading: false,
    data: [],
    error: ''
}

const reducer = (state = initial_state, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case PRODUCT_CATEGORIES_REQUEST: {
                draft.loading = true;
                break;
            }
            case PRODUCT_CATEGORIES_SUCCESS: {
                draft.data = action.payload;
                draft.loading = false;
                break;
            }
            case PRODUCT_CATEGORIES_FAIL: {
                draft.data = [];
                draft.error = action.payload;
                break;
            }
            default: break;
        }
    })
}

export default reducer