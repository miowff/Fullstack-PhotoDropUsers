import { TokensResponse } from "src/models/tokensResponse";
import { LoginRegistrationModel, UserModel } from "src/models/user";

export interface IUsersService {
  loginOrRegister(request: LoginRegistrationModel): Promise<TokensResponse>;
  getById(userId: string): Promise<UserModel>;
  refreshAccessToken(refreshToken: string): Promise<TokensResponse>;
}
