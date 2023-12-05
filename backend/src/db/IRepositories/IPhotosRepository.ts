import { PhotoDetails } from "../entities/photo";

export interface IPhotosRepository<TSelect> {
  getAllUserPhotos(userId: string): Promise<PhotoDetails[]>;
  getFirstAlbumPhoto(userId: string, albumId: string): Promise<TSelect>;
  getAlbumPhotos(albumId: string, userId: string): Promise<PhotoDetails[]>;
  activateAlbumPhotos(albumId: string, userId: string): Promise<void>;
}
