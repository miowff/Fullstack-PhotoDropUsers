export interface IAlbumsRepository<TSelect> {
  getAllUserAlbums(userId: string): Promise<TSelect[]>;
}
