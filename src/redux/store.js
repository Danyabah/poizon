import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import adminReducer from "./slices/adminReducer";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
