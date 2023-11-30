export interface IAlbumsRepository<TSelect> {
  getAllUserAlbums(userId: string): Promise<TSelect[]>;
  getAlbum(albumId: string): Promise<TSelect>;
  isAlbumActivated(albumId: string, userId: string): Promise<boolean>;
}
