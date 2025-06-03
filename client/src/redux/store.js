import { userReducer } from "./reducers/user";
import { eventReducer } from "./reducers/event";
import { configureStore } from "@reduxjs/toolkit";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
  },
});

export default store;
