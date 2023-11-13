import { MySql2Database } from "drizzle-orm/mysql2";
import { db } from "../dbConnection";

import { IPhotosRepository } from "../IRepositories/IPhotosRepository";
import { Photo, photos } from "../entities/photo";
import { and, eq, getTableColumns } from "drizzle-orm";
import { userPhotos } from "../entities/userPhotos";

class PhotosRepository implements IPhotosRepository<Photo> {
  constructor(private readonly db: MySql2Database) {}
  getAllUserPhotos = async (userId: string): Promise<Photo> => {
    throw new Error("Method not implemented.");
  };
  getFirstAlbumPhoto = async (
    userId: string,
    albumId: string
  ): Promise<Photo> => {
    const { ...selectPhotos } = getTableColumns(photos);
    const result = await this.db
      .select(selectPhotos)
      .from(photos)
      .innerJoin(userPhotos, eq(userPhotos.photoId, photos.id))
      .where(and(eq(photos.albumId, albumId), eq(userPhotos.UserId, userId)))
      .groupBy(photos.id);
    return result[0];
  };
}
export const photosRepository = new PhotosRepository(db);
