import { IAlbumsRepository } from "src/db/IRepositories/IAlbumsRepository";
import { IAlbumsService } from "./IServices/IAlbumsService";
import { Album } from "src/db/entities/album";
import { albumsRepository } from "src/db/repositories/albumsRepository";
import { AlbumModel } from "src/models/albums";
import { IPhotosRepository } from "src/db/IRepositories/IPhotosRepository";
import { Photo } from "src/db/entities/photo";
import { photosRepository } from "src/db/repositories/photosRepository";
import { S3FolderNames } from "src/enums/s3FolderNames";
import { s3Service } from "./utils/s3Service";

class AlbumsService implements IAlbumsService {
  constructor(
    private readonly albumsRepository: IAlbumsRepository<Album>,
    private readonly photosRepository: IPhotosRepository<Photo>
  ) {}
  getAllUserAlbums = async (userId: string): Promise<AlbumModel[]> => {
    const userAlbums = await this.albumsRepository.getAllUserAlbums(userId);
    const result: AlbumModel[] = await Promise.all(
      userAlbums.map(async (album) => {
        const { title, id: albumId } = album;
        const { photoName } = await this.photosRepository.getFirstAlbumPhoto(
          userId,
          albumId
        );
        const photoKey = `${S3FolderNames.ORIGINAL_PHOTOS}/${title}/${photoName}`;
        const photoAccessUrl = await s3Service.createAccessPhotoUrl(photoKey);
        return { previewPhotoLink: photoAccessUrl, title };
      })
    );  
    return result;
  };
}

export const albumsService = new AlbumsService(
  albumsRepository,
  photosRepository
);
