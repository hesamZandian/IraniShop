import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CATEGORIES_FAIL, 
    PRODUCT_CATEGORIES_REQUEST, 
    PRODUCT_CATEGORIES_SUCCESS,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_CATEGORY_DELETE_REQUEST,
    PRODUCT_CATEGORY_DELETE_SUCCESS,
    PRODUCT_CATEGORY_DELETE_FAIL,
    PRODUCT_CATEGORY_CREATE_REQUEST,
    PRODUCT_CATEGORY_CREATE_SUCCESS,
    PRODUCT_CATEGORY_CREATE_RESET,
    PRODUCT_CATEGORY_UPDATE_SUCCESS,
    PRODUCT_CATEGORY_UPDATE_FAIL,
    PRODUCT_CATEGORY_UPDATE_RESET,
    PRODUCT_CATEGORY_DETAILS_SUCCESS,
    PRODUCT_CATEGORY_DETAILS_FAIL,
    PRODUCT_CATEGORY_DETAILS_REQUEST,
    PRODUCT_CATEGORY_CREATE_FAIL,
    PRODUCT_CATEGORY_UPDATE_REQUEST,

} from '../constants/productConstants'
import produce from 'immer'

const initial_state = {
    productList: {
        loading: false,
        products: [],
        categories: [],
        brands: [],
        page: 1,
        pages: 1,
        error: ''
    },
    productDetails: {
        loading: false,
        product: { reviews: [] }, 
        categories: [],
        brands: [],
        error: ''
    },
    productCategories: { 
        loading: false,
        data: [],
        error: '',
        page: 1,
        pages: 1
    },
    productCategoryDetails: {
        loading: false,
        category: null, 
        error: ''
    },
    productCategoryCreate: {
        loading: false,
        success: false,
        category: null,
        error: ''
    },
    productCategoryUpdate: { 
        loading: false,
        success: false,
        category: null,
        error: '' 
    },
    productCategoryDelete: {
        loading: false,
        success: false,
        error: ''
    },
    productCreate: {
        loading: false,
        success: false,
        product: null,
        error: ''
    },
    productUpdate: { 
        loading: false,
        success: false,
        product: null,
        error: '' 
    },
    productReviewCreate: {
        loading: false,
        success: false,
        error: ''
    },
    productDelete: {
        loading: false,
        success: false,
        error: ''
    },
    productTopRated: {
        loading: false,
        products: [],
        error: ''
    }
}

const reducer = (state = initial_state, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case PRODUCT_LIST_REQUEST:
                draft.productList.loading = true;
                break;
                case PRODUCT_LIST_SUCCESS:
                    draft.productList.products = action.payload.products;
                    draft.productList.categories = action.payload.categories;
                    draft.productList.brands = action.payload.brands;
                    draft.productList.page = action.payload.page;
                    draft.productList.pages = action.payload.pages;
                    draft.productList.loading = false;
                    break;
            case PRODUCT_LIST_FAIL: {
                draft.data = [];
                draft.error = action.payload;
                break;
            }

            case PRODUCT_DETAILS_REQUEST:
                draft.productDetails.loading = true;
                break;
            case PRODUCT_DETAILS_SUCCESS:
                draft.productDetails.product = action.payload.product;
                draft.productDetails.categories = action.payload.categories;
                draft.productDetails.brands = action.payload.brands;
                draft.productDetails.loading = false;
                break;
            case PRODUCT_DETAILS_FAIL:
                draft.productDetails.error = action.payload;
                draft.productDetails.loading = false;
                break;
            case PRODUCT_CATEGORIES_REQUEST:
                draft.productCategories.loading = true;
                break;
            case PRODUCT_CATEGORIES_SUCCESS:
                draft.productCategories.data = action.payload.data;
                draft.productCategories.pages = action.payload.pages;
                draft.productCategories.page = action.payload.page;
                draft.productCategories.loading = false;
                break;            
            case PRODUCT_CATEGORIES_FAIL:
                draft.productCategories.error = action.payload;
                draft.productCategories.loading = false;    
                break;
            
            case PRODUCT_CATEGORY_DETAILS_REQUEST:
                draft.productCategoryDetails.loading = true;
                break;
            case PRODUCT_CATEGORY_DETAILS_SUCCESS:
                draft.productCategoryDetails.category = action.payload;
                draft.productCategoryDetails.loading = false;
                break;
            case PRODUCT_CATEGORY_DETAILS_FAIL:
                draft.productCategoryDetails.error = action.payload;
                draft.productCategoryDetails.loading = false;
                break;
            case PRODUCT_CATEGORY_DELETE_REQUEST:
                draft.productCategoryDelete.loading = true;
                break;
            case PRODUCT_CATEGORY_DELETE_SUCCESS:
                draft.productCategoryDelete.success = true;
                draft.productCategoryDelete.loading = false;
                break;
            case PRODUCT_CATEGORY_DELETE_FAIL:
                draft.productCategoryDelete.error = action.payload;
                draft.productDelete.loading = false;
                break;

            case PRODUCT_CATEGORY_CREATE_REQUEST:
                draft.productCategoryCreate.loading = true;
                break;
            case PRODUCT_CATEGORY_CREATE_SUCCESS:
                draft.productCategoryCreate.success = true;
                draft.productCategoryCreate.category = action.payload;
                draft.productCategoryCreate.loading = false;
                break;
            case PRODUCT_CATEGORY_CREATE_FAIL:
                draft.productCategoryCreate.error = action.payload;
                draft.productCategoryCreate.loading = false;
                break;
            case PRODUCT_CATEGORY_CREATE_RESET:
                draft.productCategoryCreate.loading = false;
                draft.productCategoryCreate.success = false;
                draft.productCategoryCreate.category = null;
                draft.productCategoryCreate.error = '';
                break;

            case PRODUCT_CATEGORY_UPDATE_REQUEST:
                draft.productCategoryUpdate.loading = true;
                break;
            case PRODUCT_CATEGORY_UPDATE_SUCCESS:
                draft.productCategoryUpdate.success = true;
                draft.productCategoryUpdate.category = action.payload;
                draft.productCategoryUpdate.loading = false;
                break;
            case PRODUCT_CATEGORY_UPDATE_FAIL:
                draft.productCategoryUpdate.error = action.payload;
                draft.productCategoryUpdate.loading = false;
                break;
            case PRODUCT_CATEGORY_UPDATE_RESET:
                draft.productCategoryUpdate.loading = false;
                draft.productCategoryUpdate.success = false;
                draft.productCategoryUpdate.category = null;
                draft.productCategoryUpdate.error = '';
                break;

            case PRODUCT_DELETE_REQUEST:
                draft.productDelete.loading = true;
                break;
            case PRODUCT_DELETE_SUCCESS:
                draft.productDelete.success = true;
                draft.productDelete.error = '';
                draft.productDelete.loading = false;
                break;    
            case PRODUCT_DELETE_FAIL:
                draft.productDelete.error = action.payload;
                draft.productDelete.loading = false;
                break;
            case PRODUCT_CREATE_REQUEST:
                draft.productCreate.loading = true;
                break;
            case PRODUCT_CREATE_SUCCESS:
                draft.productCreate.success = true;
                draft.productCreate.product = action.payload;
                draft.productCreate.loading = false;
                break;
            case PRODUCT_CREATE_FAIL:
                draft.productCreate.error = action.payload;
                draft.productCreate.loading = false;
                break;
            case PRODUCT_CREATE_RESET:
                draft.productCreate.loading = false;
                draft.productCreate.success = false;
                draft.productCreate.product = null;
                draft.productCreate.error = '';            
                break;
            
            case PRODUCT_UPDATE_REQUEST:
                draft.productUpdate.loading = true;
                break;
            case PRODUCT_UPDATE_SUCCESS:
                draft.productUpdate.success = true;
                draft.productUpdate.product = action.payload;
                draft.productUpdate.loading = false;
                break;
            case PRODUCT_UPDATE_FAIL:
                draft.productUpdate.error = action.payload;
                draft.productUpdate.loading = false;
                break;
            case PRODUCT_UPDATE_RESET:
                draft.productUpdate.loading = false;
                draft.productUpdate.success = false;
                draft.productUpdate.product = null;
                draft.productUpdate.error = '';
                break;
        
            case PRODUCT_CREATE_REVIEW_REQUEST:
                draft.productReviewCreate.loading = true;
                break;
            case PRODUCT_CREATE_REVIEW_SUCCESS:
                draft.productReviewCreate.success = true;
                draft.productReviewCreate.loading = false;
                break;
            case PRODUCT_CREATE_REVIEW_FAIL:
                draft.productReviewCreate.error = action.payload;
                draft.productReviewCreate.loading = false;
                break;
            case PRODUCT_CREATE_REVIEW_RESET:
                draft.productReviewCreate.loading = false;
                draft.productReviewCreate.success = false;
                draft.productReviewCreate.error = '';
                break;

            case PRODUCT_TOP_REQUEST:
                draft.productTopRated.loading = true;
                break;
            case PRODUCT_TOP_SUCCESS:
                draft.productTopRated.products = action.payload;
                draft.productTopRated.loading = false;
                break;
            case PRODUCT_TOP_FAIL:
                draft.productTopRated.error = action.payload;
                draft.productTopRated.loading = false;
                break;
                
            default: break;
        }
    })
}

export default reducer
