import { LoginRegistrationModel } from "../../../backend/src/models/user";
import { TokensResponse } from "../../../backend/src/models/tokensResponse";
import { api } from "./apiSlice";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginOrRegister: builder.mutation<TokensResponse, LoginRegistrationModel>({
      query: (userData) => ({
        url: "/login-or-register",
        method: "POST",
        body: userData,
      }),
    }),
    requestCode: builder.mutation<string, string>({
      query: (phoneNumber) => ({
        url: "/request-code",
        method: "POST",
        body: { phoneNumber },
      }),
    }),
  }),
});
export const { useLoginOrRegisterMutation, useRequestCodeMutation } = authApi;
export const {
  endpoints: { loginOrRegister, requestCode },
} = authApi;
