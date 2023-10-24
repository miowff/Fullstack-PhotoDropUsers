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
    return { accessToken };
  };
  validateAccessToken = async (token: string) => {
    return jwt.verify(token, getEnv("ACCESS_TOKEN_SECRET_USERS") as string);
  };
}

export const jwtTokenService = new JwtTokensService();
