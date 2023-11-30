import { MySql2Database } from "drizzle-orm/mysql2";
import { db } from "../dbConnection";
import { IPhotosRepository } from "../IRepositories/IPhotosRepository";
import { Photo, PhotoDetails, photos } from "../entities/photo";
import { and, eq, getTableColumns } from "drizzle-orm";
import { userPhotos } from "../entities/userPhotos";

class PhotosRepository implements IPhotosRepository<Photo> {
  constructor(private readonly db: MySql2Database) {}
  getAlbumPhotos = async (
    albumId: string,
    userId: string
  ): Promise<PhotoDetails[]> => {
    const { ...selectPhotos } = getTableColumns(photos);
    const resultType = { ...selectPhotos, isActivated: userPhotos.isActivated };
    return await this.db
      .select(resultType)
      .from(userPhotos)
      .innerJoin(photos, eq(photos.id, userPhotos.photoId))
      .where(
        and(eq(userPhotos.albumId, albumId), eq(userPhotos.UserId, userId))
      );
  };
  getAllUserPhotos = async (userId: string): Promise<PhotoDetails[]> => {
    const { ...selectPhotos } = getTableColumns(photos);
    const resultType = { ...selectPhotos, isActivated: userPhotos.isActivated };
    return await this.db
      .select(resultType)
      .from(userPhotos)
      .innerJoin(photos, eq(photos.id, userPhotos.photoId))
      .where(eq(userPhotos.UserId, userId));
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
