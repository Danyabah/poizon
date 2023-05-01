import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  currentProductInfo: {},
  payMethod: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = {};
    },
    setCurrentProductInfo: (state, action) => {
      state.currentProductInfo = action.payload;
    },
    setPayMethod: (state, action) => {
      state.payMethod = action.payload;
    },
  },
});

export const {
  setUserInfo,
  clearUserInfo,
  setCurrentProductInfo,
  setPayMethod,
} = userSlice.actions;

export default userSlice.reducer;
