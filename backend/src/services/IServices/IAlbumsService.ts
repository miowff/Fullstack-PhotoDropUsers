import { AlbumModel, AlbumWithPhotos } from "src/models/albums";

export interface IAlbumsService {
  getAllUserAlbums(userId: string): Promise<AlbumModel[]>;
  getAlbumWithPhotos(albumId: string, userId: string): Promise<AlbumWithPhotos>;
  getAlbum(albumId: string, userId: string): Promise<AlbumModel>;
}
