import { userReducer } from "./reducers/user";
import { cartReducer } from "./reducers/cart";
import { eventReducer } from "./reducers/event";
import { configureStore } from "@reduxjs/toolkit";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { wishlistReducer } from "./reducers/wishlist";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
