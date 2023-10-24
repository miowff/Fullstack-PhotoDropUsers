import { phoneNumberCode } from "../photodrop-database-schema/schema/phoneNumberCode";

export const phoneCode = phoneNumberCode;
export type InsertPhoneCode = typeof phoneCode.$inferInsert;
export type SelectPhoneCode = typeof phoneCode.$inferSelect;
