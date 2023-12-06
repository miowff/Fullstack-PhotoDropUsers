import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../enums/constants";
import { logOut, setToken } from "../redux/user/authSlice";
import { TokensResponse } from "../../../backend/src/models/tokensResponse";
import { removeTokens } from "../utils/removeTokens";
import { setTokens } from "../utils/setTokens";

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
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        api.dispatch(logOut());
        return result;
      }
      const refreshResult = (await baseQuery(
        { url: "/refresh-token", method: "POST", body: { refreshToken } },
        api,
        extraOptions
      )) as { data: TokensResponse } | undefined;
      if (refreshResult) {
        api.dispatch(setToken(refreshResult.data));
        result = await baseQuery(args, api, extraOptions);
        setTokens(refreshResult.data);
        return result;
      } else {
        api.dispatch(logOut());
        removeTokens();
      }
    } catch (err) {
      api.dispatch(logOut());
      removeTokens();
    }
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
