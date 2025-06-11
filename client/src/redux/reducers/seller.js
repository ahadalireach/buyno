import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("getSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase("getAllSellersRequestByAdmin", (state) => {
      state.adminSellersLoading = true;
    })
    .addCase("getAllSellersSuccessByAdmin", (state, action) => {
      state.adminSellersLoading = false;
      state.adminSellers = action.payload;
    })
    .addCase("getAllSellersFailByAdmin", (state, action) => {
      state.adminSellersLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
