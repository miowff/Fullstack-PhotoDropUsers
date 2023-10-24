import { MySql2Database } from "drizzle-orm/mysql2";
import { SelectPhoneCode, InsertPhoneCode } from "../entities/phoneCode";
import { ICodesRepository } from "../IRepositories/ICodesRepository";
import { phoneNumberCode } from "../photodrop-database-schema/schema/phoneNumberCode";
import { eq } from "drizzle-orm";
import { db } from "../dbConnection";

class CodesRepository
  implements ICodesRepository<InsertPhoneCode, SelectPhoneCode>
{
  constructor(private readonly db: MySql2Database) {}
  addCode = async (phoneCode: InsertPhoneCode): Promise<void> => {
    await this.db.insert(phoneNumberCode).values(phoneCode);
  };
  getCode = async (phoneNumber: string): Promise<SelectPhoneCode> => {
    const codes = await this.db
      .select()
      .from(phoneNumberCode)
      .where(eq(phoneNumberCode.phoneNumber, phoneNumber));
    return codes[0];
  };
  updateCode = async (phoneCode: InsertPhoneCode): Promise<void> => {
    const { phoneNumber } = phoneCode;
    await this.db
      .update(phoneNumberCode)
      .set(phoneCode)
      .where(eq(phoneNumberCode.phoneNumber, phoneNumber));
  };
  deleteCode = async (phoneNumber: string): Promise<void> => {
    await this.db
      .delete(phoneNumberCode)
      .where(eq(phoneNumberCode.phoneNumber, phoneNumber));
  };
}
export const codesRepository = new CodesRepository(db);
