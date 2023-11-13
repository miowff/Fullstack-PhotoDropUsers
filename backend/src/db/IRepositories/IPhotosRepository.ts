export interface IPhotosRepository<TSelect> {
  getAllUserPhotos(userId: string): Promise<TSelect>;
  getFirstAlbumPhoto(userId: string, albumId: string): Promise<TSelect>;
}
