import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentInfo: {},
  images: [],
  publicLink: "",
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
  },
});

export const { setPaymentCurrency, setImages, setPublicLink } =
  userSlice.actions;

export default userSlice.reducer;
