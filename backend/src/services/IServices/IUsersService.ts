import { TokensResponse } from "src/models/tokensResponse";
import {
  AuthResponse,
  LoginRegistrationModel,
  UserModel,
} from "src/models/user";

export interface IUsersService {
  loginOrRegister(request: LoginRegistrationModel): Promise<AuthResponse>;
  getById(userId: string): Promise<UserModel>;
  refreshAccessToken(refreshToken: string): Promise<TokensResponse>;
  updateName(userId: string, name: string): Promise<string>;
  updateEmail(userId: string, email: string): Promise<string>;
  updateProfilePhotoKey(userId: string, photoKey: string): Promise<void>;
}
