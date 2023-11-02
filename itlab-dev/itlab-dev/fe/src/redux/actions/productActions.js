import ProductApi from "../../api/product/ProductApi";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch products
export const fetchProducts = (products) => {
  return async (dispatch) => {
    const currentTime = Date.now();
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    if (!lastFetchTime || currentTime - lastFetchTime >= 3600000 || 1 < 2) {
      try {
        const response = await ProductApi.getAllNoPagition();
        dispatch(fetchProductsSuccess(response));
        localStorage.setItem("lastFetchTime", currentTime.toString());
      } catch (error) {
        dispatch(fetchProductsSuccess(products));
      }
    }
  };
};
