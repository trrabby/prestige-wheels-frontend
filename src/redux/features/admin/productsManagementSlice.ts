import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

type TCartBadgeState = {
  cart: { id: string; quantity: number }[]; // Store both product ID and quantity
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
      // Check if the product is already in the cart, if so, increase its quantity
      const existingProduct = state.cart.find((item) => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ id: productId, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.cart = []; // Clear cart on logout
    });
  },
});

export const {
  setToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartBadgeSlice.actions;
export default cartBadgeSlice.reducer;

// Correct the selector
export const useCartItems = (state: RootState) =>
  (state.cart as TCartBadgeState).cart;
