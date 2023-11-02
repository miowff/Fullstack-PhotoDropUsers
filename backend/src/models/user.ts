export interface LoginRegistrationModel {
  phoneNumber: string;
  code: string;
}
export interface UserModel {
  email: string | null;
  fullName: string | null;
  profilePhotoLink: string | null;
}
