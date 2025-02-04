import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

type TCartBadgeState = {
  cart: string[];
};

const initialState: TCartBadgeState = {
  cart: [],
};

const cartBadgeSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setToCart: (state, action) => {
      const productId = action.payload;
      state.cart.push(productId);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((id) => id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.cart = []; // Clear cart on logout
    });
  },
});

export const { setToCart, removeFromCart } = cartBadgeSlice.actions;
export default cartBadgeSlice.reducer;

// Correct the selector
export const useCartItems = (state: RootState) =>
  (state.cart as TCartBadgeState).cart;
