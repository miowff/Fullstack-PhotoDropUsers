import { userRefreshToken as userRefreshTokenSchema } from "../photodrop-database-schema/schema/accessRefreshTokens";
export const userRefreshToken = userRefreshTokenSchema;
export type InsertRefreshToken = typeof userRefreshToken.$inferInsert;
export type SelectRefreshToken = typeof userRefreshTokenSchema.$inferSelect;
