import { IUsersRepository } from "src/db/IRepositories/IUsersRepository";
import { IUsersService } from "./IServices/IUsersService";
import { InsertUser, SelectUser } from "src/db/entities/users";
import { TokensResponse } from "src/models/tokensResponse";
import { LoginModel, RegistrationModel } from "src/models/user";
import { usersRepository } from "src/db/repositories/usersRepository";
import { ApiError } from "src/errors/apiError";
import { ICodesService } from "./IServices/ICodesService";
import { codesService } from "./codesService";
import { jwtTokenService } from "./utils/jwtTokensService";
import { randomUUID } from "crypto";

class UsersService implements IUsersService {
  constructor(
    private readonly usersRepository: IUsersRepository<InsertUser, SelectUser>,
    private readonly codesService: ICodesService
  ) {}
  loginUser = async (loginModel: LoginModel): Promise<TokensResponse> => {
    const { phoneNumber, code } = loginModel;
    const existsUsers = await this.usersRepository.getByPhoneNumber(
      phoneNumber
    );
    if (!existsUsers) {
      throw ApiError.NotFound("User");
    }
    await this.codesService.validateCode(phoneNumber, code);
    return await jwtTokenService.generateAccessToken(existsUsers.id);
  };
  registerUser = async (
    registrationModel: RegistrationModel
  ): Promise<TokensResponse> => {
    const { phoneNumber, email, code, fullName } = registrationModel;
    const existsUsers = await this.usersRepository.getByPhoneNumber(
      phoneNumber
    );
    if (existsUsers) {
      throw ApiError.AlreadyExists("User");
    }
    await this.codesService.validateCode(phoneNumber, code);
    const userId = randomUUID();
    const newUser: InsertUser = {
      id: userId,
      email,
      phoneNumber,
      fullName,
    };
    await this.usersRepository.addUser(newUser);
    return await jwtTokenService.generateAccessToken(userId);
  };
}

export const userService = new UsersService(usersRepository, codesService);
