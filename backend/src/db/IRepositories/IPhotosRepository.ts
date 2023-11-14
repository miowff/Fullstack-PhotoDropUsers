import { PhotoDetails } from "../entities/photo";

export interface IPhotosRepository<TSelect> {
  getAllUserPhotos(userId: string): Promise<PhotoDetails[]>;
  getFirstAlbumPhoto(userId: string, albumId: string): Promise<TSelect>;
}
