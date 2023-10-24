import { TokensResponse } from "src/models/tokensResponse";
import { LoginModel, RegistrationModel } from "src/models/user";

export interface IUsersService {
  loginUser(loginModel: LoginModel): Promise<TokensResponse>;
  registerUser(registrationModel: RegistrationModel): Promise<TokensResponse>;
}
