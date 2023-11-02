import { useSelector } from "react-redux";
import CartApi from "../../api/cart/CartApi";

export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const FETCH_CARTS = "FETCH_CARTS";

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize
) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Đã thêm vào giỏ hàng", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : item.selectedProductColor
          ? item.selectedProductColor
          : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : item.selectedProductSize
          ? item.selectedProductSize
          : null,
      },
    });
  };
};
//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Đã xóa khỏi giỏ hàng", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Đã xóa khỏi giỏ hàng", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = (addToast) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};
export const confirmOrder = () => {
  return (dispatch) => {
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};
// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter((single) => single.color === color)[0]
      .size.filter((single) => single.name === size)[0].stock;
  }
};
export const fetchDCarts = (data) => ({
  type: FETCH_CARTS,
  payload: data,
});
export const cleanCart = () => {
  return (dispatch) => {
    dispatch(fetchDCarts([]));
  };
};
export const fetchDataCarts = (cart) => {
  return async (dispatch, getState) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const res = await CartApi.GetCart(user.user.userId);
        if (res.length > 0) {
          dispatch(fetchDCarts(res));
          return;
        } else if (getState().cartData.length > 0) {
          const userId = user.user.userId;
          const carts = getState().cartData.map((product) => ({
            productId: product.id,
            userId: userId,
            quantity: product.quantity,
            isAdd: 1, // or another appropriate value
          }));

          const result = {
            userId: userId,
            carts: carts,
          };
          await CartApi.AddListCart(result);
        }
        // useSelector((state) => state.cartData);
      }
    } catch (error) {}
  };
};
