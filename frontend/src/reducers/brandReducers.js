import {
    BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_RESET,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DETAILS_FAIL,
  BRAND_DETAILS_REQUEST,
  BRAND_DETAILS_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_RESET,
  BRAND_UPDATE_SUCCESS,
} from "../constants/brandConstants";
import produce from "immer";

const initial_state = {
  brandList: {
    loading: false,
    data: [],
    categories: [],
    error: "",
    page: 1,
    pages: 1,
  },
  brandDetails: {
    loading: false,
    brand: null,
    categories: [],
    error: "",
  },
  brandCreate: {
    loading: false,
    success: false,
    brand: null,
    error: "",
  },
  brandUpdate: {
    loading: false,
    success: false,
    brand: null,
    error: "",
  },
  brandDelete: {
    loading: false,
    success: false,
    error: "",
  },
};

const reducer = (state = initial_state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case BRAND_LIST_REQUEST:
        draft.brandList.loading = true;
        break;
      case BRAND_LIST_SUCCESS:
        draft.brandList.data = action.payload.data;
        draft.brandList.categories = action.payload.categories;
        draft.brandList.pages = action.payload.pages;
        draft.brandList.page = action.payload.page;
        draft.brandList.loading = false;
        break;
      case BRAND_LIST_FAIL:
        draft.brandList.error = action.payload;
        draft.brandList.loading = false;
        break;

      case BRAND_DETAILS_REQUEST:
        draft.brandDetails.loading = true;
        break;
      case BRAND_DETAILS_SUCCESS:
        draft.brandDetails.brand = action.payload.brand;
        draft.brandDetails.categories = action.payload.categories;
        draft.brandDetails.loading = false;
        break;
      case BRAND_DETAILS_FAIL:
        draft.brandDetails.error = action.payload;
        draft.brandDetails.loading = false;
        break;

      case BRAND_DELETE_REQUEST:
        draft.brandDelete.loading = true;
        break;
      case BRAND_DELETE_SUCCESS:
        draft.brandDelete.success = true;
        draft.brandDelete.loading = false;
        break;
      case BRAND_DELETE_FAIL:
        draft.brandDelete.error = action.payload;
        draft.brandDelete.loading = false;
        break;

      case BRAND_CREATE_REQUEST:
        draft.brandCreate.loading = true;
        break;
      case BRAND_CREATE_SUCCESS:
        draft.brandCreate.success = true;
        draft.brandCreate.brand = action.payload;
        draft.brandCreate.loading = false;
        break;
      case BRAND_CREATE_FAIL:
        draft.brandCreate.error = action.payload;
        draft.brandCreate.loading = false;
        break;
      case BRAND_CREATE_RESET:
        draft.brandCreate.loading = false;
        draft.brandCreate.success = false;
        draft.brandCreate.brand = null;
        draft.brandCreate.error = "";
        break;

      case BRAND_UPDATE_REQUEST:
        draft.brandUpdate.loading = true;
        break;
      case BRAND_UPDATE_SUCCESS:
        draft.brandUpdate.success = true;
        draft.brandUpdate.brand = action.payload;
        draft.brandUpdate.loading = false;
        break;
      case BRAND_UPDATE_FAIL:
        draft.brandUpdate.error = action.payload;
        draft.brandUpdate.loading = false;
        break;
      case BRAND_UPDATE_RESET:
        draft.brandUpdate.loading = false;
        draft.brandUpdate.success = false;
        draft.brandUpdate.brand = null;
        draft.brandUpdate.error = "";
        break;

      default:
        break;
    }
  });
};

export default reducer;
