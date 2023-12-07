import { PhotoResponse } from "src/models/photo";
import { IPhotosService } from "./IServices/IPhotosService";
import { Photo } from "src/db/entities/photo";
import { IPhotosRepository } from "src/db/IRepositories/IPhotosRepository";
import { photosRepository } from "src/db/repositories/photosRepository";
import { S3FolderNames } from "src/enums/s3FolderNames";
import { s3Service } from "./utils/s3Service";

class PhotosService implements IPhotosService {
  constructor(private readonly photosRepository: IPhotosRepository<Photo>) {}
  activateAlbumPhotos = async (
    albumId: string,
    userId: string
  ): Promise<void> => {
    await this.photosRepository.activateAlbumPhotos(albumId, userId);
  };
  getAllUserPhotos = async (userId: string): Promise<PhotoResponse[]> => {
    const photos = await this.photosRepository.getAllUserPhotos(userId);
    return await Promise.all(
      photos.map(async (photo) => {
        const { isActivated, photoName, albumTitle, albumId } = photo;
        let photoKey = ``;
        const previewKey = `${S3FolderNames.PREVIEWS}/${albumTitle}/${photoName}`;
        if (isActivated) {
          photoKey = S3FolderNames.ORIGINAL_PHOTOS;
        } else {
          photoKey = S3FolderNames.WATERMARKED_PHOTOS;
        }
        photoKey += `/${albumTitle}/${photoName}`;
        const fullPhotoAccessLink = await s3Service.createAccessPhotoUrl(
          photoKey
        );
        const preview = await s3Service.getImageAsBase64(previewKey);
        let previewBase64 = `data:image/jpeg;base64,${preview}`;
        return {
          fullPhotoAccessLink,
          isActivated,
          albumId,
          albumTitle,
          previewBase64,
        };
      })
    );
  };
}
export const photosService = new PhotosService(photosRepository);
