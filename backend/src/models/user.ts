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
export interface RequestUploadPhotoUrl {
  fileName: string;
  type: string;
}
interface PresignedUrl {
  url: string;
  fields: Fields;
}

interface Fields {
  Key: string;
  ContentType: string;
  bucket: string;
  "X-Amz-Algorithm": string;
  "X-Amz-Credential": string;
  "X-Amz-Date": string;
  "X-Amz-Security-Token": string;
  Policy: string;
  "X-Amz-Signature": string;
}

export interface UploadProfilePicUrlResponse {
  url: PresignedUrl;
  accessUrl: string;
}

export interface RequestCode {
  phoneNumber: string;
}
