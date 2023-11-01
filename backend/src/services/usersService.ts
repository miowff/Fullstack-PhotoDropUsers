import { IUsersRepository } from "src/db/IRepositories/IUsersRepository";
import { IUsersService } from "./IServices/IUsersService";
import { InsertUser, SelectUser } from "src/db/entities/users";
import { TokensResponse } from "src/models/tokensResponse";
import { LoginRegistrationModel } from "src/models/user";
import { usersRepository } from "src/db/repositories/usersRepository";
import { ICodesService } from "./IServices/ICodesService";
import { codesService } from "./codesService";
import { jwtTokenService } from "./utils/jwtTokensService";
import { randomUUID } from "crypto";

class UsersService implements IUsersService {
  constructor(
    private readonly usersRepository: IUsersRepository<InsertUser, SelectUser>,
    private readonly codesService: ICodesService
  ) {}
  loginOrRegister = async (
    request: LoginRegistrationModel
  ): Promise<TokensResponse> => {
    const { phoneNumber, code } = request;
    const existsUsers = await this.usersRepository.getByPhoneNumber(
      phoneNumber
    );
    await this.codesService.validateCode(phoneNumber, code);
    if (!existsUsers) {
      const userId = randomUUID();
      const newUser: InsertUser = {
        id: userId,
        phoneNumber,
      };
      await this.usersRepository.addUser(newUser);
      return await jwtTokenService.generateAccessToken(userId);
    }
    return await jwtTokenService.generateAccessToken(existsUsers.id);
  };
}

export const userService = new UsersService(usersRepository, codesService);
