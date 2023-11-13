import { AlbumModel } from "src/models/albums";

export interface IAlbumsService {
  getAllUserAlbums(userId: string): Promise<AlbumModel[]>;
}
