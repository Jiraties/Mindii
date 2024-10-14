import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authenticationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
