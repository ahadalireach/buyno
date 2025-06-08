import { userReducer } from "./reducers/user";
import { cartReducer } from "./reducers/cart";
import { eventReducer } from "./reducers/event";
import { orderReducer } from "./reducers/order";
import { configureStore } from "@reduxjs/toolkit";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { wishlistReducer } from "./reducers/wishlist";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    events: eventReducer,
    seller: sellerReducer,
    products: productReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
