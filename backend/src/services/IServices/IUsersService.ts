import { TokensResponse } from "src/models/tokensResponse";
import { LoginRegistrationModel } from "src/models/user";

export interface IUsersService {
  loginOrRegister(request: LoginRegistrationModel): Promise<TokensResponse>;
}
