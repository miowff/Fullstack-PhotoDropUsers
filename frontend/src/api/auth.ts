import {
  RefreshTokens,
  TokensResponse,
} from "../../../backend/src/models/tokensResponse";
import {
  LoginRegistrationModel,
  UserModel,
} from "../../../backend/src/models/user";
import { apiSlice } from "./api";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginOrRegister: builder.mutation<TokensResponse, LoginRegistrationModel>({
      query: (userData) => ({
        url: "/login-or-register",
        method: "POST",
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<UserModel, void>({
      query: () => ({
        url: "/current-user",
        method: "GET",
      }),
    }),
    requestCode: builder.mutation<string, string>({
      query: (phoneNumber) => ({
        url: "/request-code",
        method: "POST",
        body: { phoneNumber },
      }),
    }),
    refreshToken: builder.mutation<RefreshTokens, TokensResponse>({
      query: (refreshToken) => ({
        url: "/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});
export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLoginOrRegisterMutation,
  useRequestCodeMutation,
  useRefreshTokenMutation,
} = authApi;
