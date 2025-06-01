import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getSellerLoading", (state) => {
      state.isLoading = true;
    })
    .addCase("getSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("getSellerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
