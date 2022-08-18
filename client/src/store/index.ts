import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { dropsSlice } from "./slices/drops";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    drops: dropsSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
