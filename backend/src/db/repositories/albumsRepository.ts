import { MySql2Database } from "drizzle-orm/mysql2";
import { db } from "../dbConnection";
import { IAlbumsRepository } from "../IRepositories/IAlbumsRepository";
import { Album, albums } from "../entities/album";
import { userPhotos } from "../entities/userPhotos";
import { eq, getTableColumns } from "drizzle-orm";

class AlbumsRepository implements IAlbumsRepository<Album> {
  constructor(private readonly db: MySql2Database) {}
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
