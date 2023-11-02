import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../api/auth";
import { ACCESS_TOKEN_KEY } from "../enums/constants";
export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: authApi.endpoints.loginOrRegister.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    const { accessToken } = action.payload;
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
  },
});
