import { IAlbumsRepository } from "src/db/IRepositories/IAlbumsRepository";
import { IAlbumsService } from "./IServices/IAlbumsService";
import { Album } from "src/db/entities/album";
import { albumsRepository } from "src/db/repositories/albumsRepository";
import { AlbumModel, AlbumWithPhotos } from "src/models/albums";
import { IPhotosRepository } from "src/db/IRepositories/IPhotosRepository";
import { Photo } from "src/db/entities/photo";
import { photosRepository } from "src/db/repositories/photosRepository";
import { S3FolderNames } from "src/enums/s3FolderNames";
import { s3Service } from "./utils/s3Service";
import { format } from "date-fns";

class AlbumsService implements IAlbumsService {
  constructor(
    private readonly albumsRepository: IAlbumsRepository<Album>,
    private readonly photosRepository: IPhotosRepository<Photo>
  ) {}
  getAlbumWithPhotos = async (
    albumId: string,
    userId: string
  ): Promise<AlbumWithPhotos> => {
    const { title, createdDate } = await this.albumsRepository.getAlbum(
      albumId
    );
    const isActivated = await this.albumsRepository.isAlbumActivated(
      albumId,
      userId
    );
    const photos = await this.photosRepository.getAlbumPhotos(albumId, userId);
    const photosResponse = await Promise.all(
      photos.map(async (photo) => {
        const { isActivated, photoName, albumTitle } = photo;
        let photoKey = ``;
        if (isActivated) {
          photoKey = S3FolderNames.ORIGINAL_PHOTOS;
        } else {
          photoKey = S3FolderNames.WATERMARKED_PHOTOS;
        }
        photoKey += `/${albumTitle}/${photoName}`;
        const fullPhotoAccessLink = await s3Service.createAccessPhotoUrl(
          photoKey
        );

        return { fullPhotoAccessLink, isActivated };
      })
    );
    return {
      title,
      createdDate: format(createdDate, "MMM d, yyyy"),
      isActivated,
      photos: photosResponse,
    };
  };
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
        return { albumId, previewPhotoLink: photoAccessUrl, title };
      })
    );
    return result;
  };
}

export const albumsService = new AlbumsService(
  albumsRepository,
  photosRepository
);
