import { TokensResponse } from "./tokensResponse";

export interface LoginRegistrationModel {
  phoneNumber: string;
  code: string;
}

export interface UserModel {
  email: string | null;
  fullName: string | null;
  profilePhotoLink: string | null;
}
export interface AuthResponse {
  tokens: TokensResponse;
  currentUser: UserModel;
}
export interface SetFullName {
  name: string;
}
export interface SetEmail {
  email: string;
}
