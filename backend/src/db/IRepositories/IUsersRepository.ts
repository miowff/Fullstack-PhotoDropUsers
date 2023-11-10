import {
  InsertRefreshToken,
  SelectRefreshToken,
} from "../entities/userRefreshToken";

export interface IUsersRepository<TInsert, TSelect> {
  getByPhoneNumber(phoneNumber: string): Promise<TSelect>;
  addUser(user: TInsert): Promise<void>;
  getById(userId: string): Promise<TSelect>;
  getRefreshToken(userId: string): Promise<SelectRefreshToken>;
  addRefreshToken(insertToken: InsertRefreshToken): Promise<void>;
  updateUser(userId: string, user: TInsert): Promise<void>;
}
