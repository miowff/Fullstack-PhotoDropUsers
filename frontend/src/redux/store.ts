import { configureStore } from "@reduxjs/toolkit";
import letsGetStartedStageReducer from "./letsGetStarted/letsGetStartedSlice";
import auth from "../redux/user/authSlice";
import { api } from "../api/apiSlice";
import { listenerMiddleware } from "../middleware/auth";
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    letsGetStartedStages: letsGetStartedStageReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware);
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
