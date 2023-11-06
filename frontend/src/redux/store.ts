import { configureStore } from "@reduxjs/toolkit";
import letsGetStartedStageReducer from "./letsGetStarted/letsGetStartedSlice";
import auth from "./user/authSlice";
import { apiSlice } from "../api/api";
import { listenerMiddleware } from "../middleware/auth";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
    letsGetStartedStages: letsGetStartedStageReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .prepend(listenerMiddleware.middleware);
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
