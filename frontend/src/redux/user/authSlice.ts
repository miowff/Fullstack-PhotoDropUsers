import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserModel } from "../../../../backend/src/models/user";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../enums/constants";

interface AuthState {
  user: UserModel | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuth: boolean;
}
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuth = true;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.accessToken = null;
      state.isAuth = false;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});
export const { setToken, logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
