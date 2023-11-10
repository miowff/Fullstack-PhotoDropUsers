import { TokensResponse } from "../../../backend/src/models/tokensResponse";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../enums/constants";

export const setTokens = (tokens: TokensResponse) => {
  const { accessToken, refreshToken } = tokens;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};
