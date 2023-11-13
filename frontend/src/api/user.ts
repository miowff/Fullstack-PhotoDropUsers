import {
  UploadProfilePicUrlResponse,
  RequestUploadPhotoUrl,
  SetEmail,
  SetFullName,
} from "../../../backend/src/models/user";
import { apiSlice } from "./api";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setFullName: builder.mutation<string, SetFullName>({
      query: (fullName: SetFullName) => ({
        url: "update/name",
        method: "PUT",
        body: fullName,
      }),
    }),
    setEmail: builder.mutation<string, SetEmail>({
      query: (email: SetEmail) => ({
        url: "update/email",
        method: "PUT",
        body: email,
      }),
    }),
    getUploadProfilePicUrl: builder.query<
      UploadProfilePicUrlResponse,
      RequestUploadPhotoUrl
    >({
      query: (request: RequestUploadPhotoUrl) => ({
        url: "request-upload-profile-pic-url",
        method: "POST",
        body: request,
      }),
    }),
  }),
});
export const {
  useSetFullNameMutation,
  useSetEmailMutation,
  useLazyGetUploadProfilePicUrlQuery,
} = userApi;
