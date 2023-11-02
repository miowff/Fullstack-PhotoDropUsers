import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";
import { ACCESS_TOKEN_KEY } from "../enums/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://2orh1m3spg.execute-api.us-east-1.amazonaws.com",
  prepareHeaders(headers, { getState }) {
    const token =
      (getState() as RootState).auth.token?.accessToken ||
      localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && token !== null) {
      headers.set("Authorization", token);
    }
  },
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
