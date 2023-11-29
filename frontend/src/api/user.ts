/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  UploadProfilePicUrlResponse,
  RequestUploadPhotoUrl,
  SetEmail,
  SetFullName,
} from "../../../backend/src/models/user";
import { apiSlice } from "./api";

const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ["User"] });
export const userApi = apiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    setFullName: builder.mutation<string, SetFullName>({
      query: (fullName: SetFullName) => ({
        url: "update/name",
        method: "PUT",
        body: fullName,
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "User" }],
    }),
    setEmail: builder.mutation<string, SetEmail>({
      query: (email: SetEmail) => ({
        url: "update/email",
        method: "PUT",
        body: email,
      }),
      // @ts-ignore
      providesTags: [{ type: "User" }],
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
