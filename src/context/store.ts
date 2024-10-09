import { configureStore } from "@reduxjs/toolkit";

import diagnosisDataSlice from "./diagnosisDataSlice";

export const store = configureStore({
  reducer: {
    diagnosisData: diagnosisDataSlice.reducer,
  },
});
