import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentInfo: {},
  images: [],
  publicLink: "",
  selectedProduct: {},
  orderProduct: {},
  chinaProduct: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPaymentCurrency: (state, action) => {
      state.paymentInfo.currency = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setPublicLink: (state, action) => {
      state.publicLink = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setOrderProduct: (state, action) => {
      state.orderProduct = action.payload;
    },
    setChinaProduct: (state, action) => {
      state.chinaProduct = action.payload;
    },
  },
});

export const {
  setPaymentCurrency,
  setImages,
  setPublicLink,
  setSelectedProduct,
  setOrderProduct,
  setChinaProduct,
} = userSlice.actions;

export default userSlice.reducer;
