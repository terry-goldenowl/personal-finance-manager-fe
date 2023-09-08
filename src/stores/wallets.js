import { createSlice } from "@reduxjs/toolkit";

const walletsSlice = createSlice({
  name: "wallets",
  initialState: {
    walletChosen: null,
    haveDefaultWallet: false,
    loadingWallets: false,
  },
  reducers: {
    setWalletChosen: (state, action) => {
      state.walletChosen = action.payload;
    },
    setHaveDefaultWallet: (state, action) => {
      state.haveDefaultWallet = action.payload;
    },
    setLoadingWallet: (state, action) => {
      state.loadingWallets = action.payload;
    },
  },
});

export default walletsSlice.reducer;

export const walletActions = walletsSlice.actions;
