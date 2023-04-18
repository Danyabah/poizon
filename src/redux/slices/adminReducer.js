import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPaymentCurrency: (state, action) => {
      state.paymentInfo.currency = action.payload;
    },
  },
});

export const { setPaymentCurrency } = userSlice.actions;

export default userSlice.reducer;
