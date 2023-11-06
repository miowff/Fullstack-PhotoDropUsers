import { IUsersRepository } from "src/db/IRepositories/IUsersRepository";
import { IUsersService } from "./IServices/IUsersService";
import { InsertUser, SelectUser } from "src/db/entities/users";
import { TokensResponse } from "src/models/tokensResponse";
import { LoginRegistrationModel, UserModel } from "src/models/user";
import { usersRepository } from "src/db/repositories/usersRepository";
import { ICodesService } from "./IServices/ICodesService";
import { codesService } from "./codesService";
import { jwtTokenService } from "./utils/jwtTokensService";
import { randomUUID } from "crypto";
import { ApiError } from "src/errors/apiError";
import { JwtPayload } from "jsonwebtoken";

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
      const tokens = await jwtTokenService.generateAccessToken(userId);
      await this.usersRepository.addRefreshToken({
        userId,
        refreshToken: tokens.refreshToken,
      });
      return tokens;
    }
    const tokens = await jwtTokenService.generateAccessToken(existsUsers.id);
    await this.usersRepository.addRefreshToken({
      userId: existsUsers.id,
      refreshToken: tokens.refreshToken,
    });
    return tokens;
  };
  getById = async (userId: string): Promise<UserModel> => {
    const user = await this.usersRepository.getById(userId);
    if (!user) {
      throw ApiError.NotFound("User");
    }
    console.log(user);
    const { id, phoneNumber, profilePhotoKey, ...userModel } = Object.assign(
      {},
      user,
      {
        profilePhotoLink: user.profilePhotoKey,
      }
    );
    return userModel;
  };
  refreshAccessToken = async (
    refreshToken: string
  ): Promise<TokensResponse> => {
    const { userId } = (await jwtTokenService.validateRefreshToken(
      refreshToken
    )) as JwtPayload;
    const token = await this.usersRepository.getRefreshToken(userId);
    if (!token) {
      throw new ApiError("Refresh token not found", 404);
    }
    if (refreshToken !== token.refreshToken) {
      throw new ApiError("Incorrect refresh token", 403);
    }
    const tokens = await jwtTokenService.generateAccessToken(userId);
    await this.usersRepository.addRefreshToken({
      userId,
      refreshToken: tokens.refreshToken,
    });
    return tokens;
  };
}

export const userService = new UsersService(usersRepository, codesService);
