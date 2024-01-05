import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      let index = state.cart.findIndex((el) => el.uuid === action.payload.uuid);
      if (index > -1) {
        state.cart[index] = action.payload;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteItem(state, action) {
      // payload:_id
      state.cart = state.cart.filter((item) => item.uuid !== action.payload);
    },
    increaseItemQty(state, action) {
      const item = state.cart.find((item) => item.uuid === action.payload);

      item.qty++;
      if (item.qty === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
      item.totalPrice = item.qty * item.unitPrice;
    },
    decreaseItemQty(state, action) {
      const item = state.cart.find((item) => item.uuid === action.payload);
      item.qty--;
      if (item.qty === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
      item.totalPrice = item.qty * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQty = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.qty, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.uuid === id)?.qty ?? 0;

export const getItemInCart = (id) => (state) =>
  state.cart.cart.find((item) => item.uuid === id);

// reselect
