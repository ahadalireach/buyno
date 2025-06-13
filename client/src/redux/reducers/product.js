import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("addProductSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("addProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("getSellerProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getSellerProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getSellerProductsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductsFail", (state, action) => {
      console.log(action.payload);

      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllProductsRequestByAdmin", (state) => {
      state.adminProductsLoading = true;
    })
    .addCase("getAllProductsSuccessByAdmin", (state, action) => {
      state.adminProductsLoading = false;
      state.adminProducts = action.payload;
    })
    .addCase("getAllProductsFailByAdmin", (state, action) => {
      state.adminProductsLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
