import { IUsersRepository } from "src/db/IRepositories/IUsersRepository";
import { IUsersService } from "./IServices/IUsersService";
import { InsertUser, SelectUser } from "src/db/entities/users";
import { TokensResponse } from "src/models/tokensResponse";
import {
  AuthResponse,
  LoginRegistrationModel,
  UserModel,
} from "src/models/user";
import { usersRepository } from "src/db/repositories/usersRepository";
import { ICodesService } from "./IServices/ICodesService";
import { codesService } from "./codesService";
import { jwtTokenService } from "./utils/jwtTokensService";
import { randomUUID } from "crypto";
import { ApiError } from "src/errors/apiError";
import { JwtPayload } from "jsonwebtoken";
import { S3FolderNames } from "src/enums/s3FoulderNames";
import { s3Service } from "./utils/s3Service";

class UsersService implements IUsersService {
  constructor(
    private readonly usersRepository: IUsersRepository<InsertUser, SelectUser>,
    private readonly codesService: ICodesService
  ) {}
  updateProfilePhotoKey = async (
    userId: string,
    photoKey: string
  ): Promise<void> => {
    const user = await this.usersRepository.getById(userId);
    if (!user) {
      throw ApiError.NotFound("User");
    }
    user.profilePhotoKey = photoKey;
    await this.usersRepository.updateUser(userId, user);
  };
  updateEmail = async (userId: string, email: string): Promise<string> => {
    const user = await this.usersRepository.getById(userId);
    if (!user) {
      throw ApiError.NotFound("User");
    }
    user.email = email;
    await this.usersRepository.updateUser(userId, user);
    return email;
  };
  updateName = async (userId: string, name: string): Promise<string> => {
    const user = await this.usersRepository.getById(userId);
    if (!user) {
      throw ApiError.NotFound("User");
    }
    user.fullName = name;
    await this.usersRepository.updateUser(userId, user);
    return name;
  };

  loginOrRegister = async (
    request: LoginRegistrationModel
  ): Promise<AuthResponse> => {
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
      const currentUser = Object.assign({}, newUser, {
        id: undefined,
        phoneNumber: undefined,
        profilePhotoKey: undefined,
        profilePhotoLink: null,
        email: null,
        fullName: null,
      });
      return { tokens, currentUser };
    }
    const tokens = await jwtTokenService.generateAccessToken(existsUsers.id);
    await this.usersRepository.addRefreshToken({
      userId: existsUsers.id,
      refreshToken: tokens.refreshToken,
    });
    const currentUser = Object.assign({}, existsUsers, {
      id: undefined,
      phoneNumber: undefined,
      profilePhotoKey: undefined,
      profilePhotoLink: existsUsers.profilePhotoKey,
    });
    return { tokens, currentUser };
  };
  getById = async (userId: string): Promise<UserModel> => {
    const user = await this.usersRepository.getById(userId);
    if (!user) {
      throw ApiError.NotFound("User");
    }
    const { profilePhotoKey: photoName } = user;
    const pathToPhoto = `${S3FolderNames.PROFILE_PICS}/${userId}/${photoName}`;
    const accessProfilePicUrl = await s3Service.createAccessPhotoUrl(
      pathToPhoto
    );
    const { id, phoneNumber, profilePhotoKey, ...userModel } = Object.assign(
      {},
      user,
      {
        profilePhotoLink: accessProfilePicUrl,
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
