import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth";
import { RootState } from "../store";
import { TokensResponse } from "../../../../backend/src/models/tokensResponse";

interface InitialState {
  token: TokensResponse | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  token: null,
  isAuthenticated: false,
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginOrRegister.matchFulfilled,
      (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      }
    );
  },
});
export const { logOut } = slice.actions;
export default slice.reducer;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectToken = (state: RootState) => state.auth.token;
