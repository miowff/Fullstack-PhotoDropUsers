import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";
import { ACCESS_TOKEN_KEY } from "../enums/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://2orh1m3spg.execute-api.us-east-1.amazonaws.com",
  prepareHeaders(headers, { getState }) {
    const token =
      (getState() as RootState).auth.accessToken ||
      localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && token !== null) {
      headers.set("Authorization", token);
    }
  },
});
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log("401 err");
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
