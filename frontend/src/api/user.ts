import { SetEmail, SetFullName } from "../../../backend/src/models/user";
import { apiSlice } from "./api";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setFullName: builder.mutation<string, SetFullName>({
      query: (fullName: SetFullName) => ({
        url: "update-name",
        method: "PUT",
        body: fullName,
      }),
    }),
    setEmail: builder.mutation<string, SetEmail>({
      query: (email: SetEmail) => ({
        url: "update-email",
        method: "PUT",
        body: email,
      }),
    }),
  }),
});
export const { useSetFullNameMutation, useSetEmailMutation } = userApi;
