import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../enums/constants";

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
