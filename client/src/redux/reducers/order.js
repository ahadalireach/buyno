import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getUserOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getUserOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getUserOrdersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getSellerOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getSellerOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getSellerOrdersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
