import { MySql2Database } from "drizzle-orm/mysql2";
import { IUsersRepository } from "../IRepositories/IUsersRepository";
import { InsertUser, SelectUser, users } from "../entities/users";
import { db } from "../dbConnection";
import { eq } from "drizzle-orm";

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
}
export const usersRepository = new UsersRepository(db);
