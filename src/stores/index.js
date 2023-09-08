import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./wallets";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

export default store;
