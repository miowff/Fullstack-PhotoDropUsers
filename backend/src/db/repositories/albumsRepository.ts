import { MySql2Database } from "drizzle-orm/mysql2";
import { db } from "../dbConnection";
import { IAlbumsRepository } from "../IRepositories/IAlbumsRepository";
import { Album, albums } from "../entities/album";
import { userPhotos } from "../entities/userPhotos";
import { and, eq, getTableColumns } from "drizzle-orm";

class AlbumsRepository implements IAlbumsRepository<Album> {
  constructor(private readonly db: MySql2Database) {}
  isUserHasAlbum = async (
    userId: string,
    albumId: string
  ): Promise<boolean> => {
    const result = await this.db
      .select()
      .from(userPhotos)
      .where(
        and(eq(userPhotos.UserId, userId), eq(userPhotos.albumId, albumId))
      )
      .groupBy(userPhotos.albumId);
    return result.length > 0;
  };
  isAlbumActivated = async (
    albumId: string,
    userId: string
  ): Promise<boolean> => {
    const result = await this.db
      .select({ isActivated: userPhotos.isActivated })
      .from(albums)
      .innerJoin(userPhotos, eq(userPhotos.albumId, albumId))
      .where(and(eq(albums.id, albumId), eq(userPhotos.UserId, userId)))
      .groupBy(userPhotos.isActivated);
    if (result.length > 1) {
      return false;
    }
    return result[0].isActivated;
  };
  getAlbum = async (albumId: string): Promise<Album> => {
    const result = await this.db
      .select()
      .from(albums)
      .where(eq(albums.id, albumId));
    return result[0];
  };
  getAllUserAlbums = async (userId: string): Promise<Album[]> => {
    const { ...selectAlbums } = getTableColumns(albums);
    return await this.db
      .select(selectAlbums)
      .from(userPhotos)
      .innerJoin(albums, eq(userPhotos.albumId, albums.id))
      .where(eq(userPhotos.UserId, userId))
      .groupBy(albums.id);
  };
}
export const albumsRepository = new AlbumsRepository(db);
