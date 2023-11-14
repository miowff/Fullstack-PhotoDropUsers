import { photos as schemaPhotos } from "../photodrop-database-schema/schema/photo";
export const photos = schemaPhotos;
export type Photo = typeof photos.$inferSelect;
export type PhotoDetails = Photo & {
  isActivated: boolean;
};
export type InsertPhoto = typeof photos.$inferInsert;
