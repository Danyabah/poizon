import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentInfo: {},
  images: [],
  address: "",
  publicLink: "",
  selectedProduct: {},
  orderProduct: {},
  chinaProduct: {},
  chinarushProduct: {},
  reload: false,
  previewimage: "",
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
    setChinarushProduct: (state, action) => {
      state.chinarushProduct = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
    setPreviewimage: (state, action) => {
      state.previewimage = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {
  setAddress,
  setPaymentCurrency,
  setImages,
  setPublicLink,
  setPreviewimage,
  setSelectedProduct,
  setOrderProduct,
  setChinarushProduct,
  setChinaProduct,
  setReload,
} = userSlice.actions;

export default userSlice.reducer;
