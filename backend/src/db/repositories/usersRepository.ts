import { MySql2Database } from "drizzle-orm/mysql2";
import { IUsersRepository } from "../IRepositories/IUsersRepository";
import { InsertUser, SelectUser, users } from "../entities/users";
import { db } from "../dbConnection";
import { eq } from "drizzle-orm";
import {
  InsertRefreshToken,
  SelectRefreshToken,
  userRefreshToken,
} from "../entities/userRefreshToken";

class UsersRepository implements IUsersRepository<InsertUser, SelectUser> {
  constructor(private readonly db: MySql2Database) {}
  getByPhoneNumber = async (phoneNumber: string): Promise<SelectUser> => {
    const response = await this.db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, phoneNumber));
    return response[0];
  };
  addUser = async (user: InsertUser): Promise<void> => {
    await this.db.insert(users).values(user);
  };
  getById = async (userId: string): Promise<SelectUser> => {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    return result[0];
  };
  getRefreshToken = async (userId: string): Promise<SelectRefreshToken> => {
    const data = await this.db
      .select()
      .from(userRefreshToken)
      .where(eq(userRefreshToken.userId, userId));
    return data[0];
  };
  addRefreshToken = async (insertToken: InsertRefreshToken): Promise<void> => {
    const { refreshToken, userId } = insertToken;
    const token = await this.getRefreshToken(userId);
    if (!token) {
      await this.db.insert(userRefreshToken).values(insertToken);
      return;
    }
    await this.db
      .update(userRefreshToken)
      .set({ refreshToken })
      .where(eq(userRefreshToken.userId, userId));
    return;
  };
}
export const usersRepository = new UsersRepository(db);
