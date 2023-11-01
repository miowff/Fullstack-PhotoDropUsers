import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../api/auth";
export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: authApi.endpoints.loginOrRegister.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    const { accessToken } = action.payload;
    if (accessToken) {
      localStorage.setItem("ACCESS_TOKEN", accessToken);
    }
  },
});
