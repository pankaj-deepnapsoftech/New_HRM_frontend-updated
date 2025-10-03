import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./api/api";
import { AuthSlice } from "./slice/AuthSlice";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    [AuthSlice.name]: AuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});
