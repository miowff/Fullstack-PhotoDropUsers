import * as jwt from "jsonwebtoken";
import getEnv from "./getEnv";
import { TokensResponse } from "src/models/tokensResponse";

class JwtTokensService {
  generateAccessToken = (userId: string): TokensResponse => {
    const accessToken = jwt.sign(
      { userId },
      getEnv("ACCESS_TOKEN_SECRET_USERS") as string,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { userId },
      getEnv("REFRESH_TOKEN_SECRET_USERS") as string,
      { expiresIn: "30d" }
    );
    return { accessToken, refreshToken };
  };
  validateAccessToken = async (token: string) => {
    return jwt.verify(token, getEnv("ACCESS_TOKEN_SECRET_USERS") as string);
  };
  validateRefreshToken = async (token: string) => {
    return jwt.verify(
      token,
      getEnv("REFRESH_TOKEN_SECRET_USERS") as string
    ) as jwt.JwtPayload;
  };
}

export const jwtTokenService = new JwtTokensService();
