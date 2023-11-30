import { PhotoResponse } from "src/models/photo";
import { IPhotosService } from "./IServices/IPhotosService";
import { Photo } from "src/db/entities/photo";
import { IPhotosRepository } from "src/db/IRepositories/IPhotosRepository";
import { photosRepository } from "src/db/repositories/photosRepository";
import { S3FolderNames } from "src/enums/s3FolderNames";
import { s3Service } from "./utils/s3Service";

class PhotosService implements IPhotosService {
  constructor(private readonly photosRepository: IPhotosRepository<Photo>) {}
  getAllUserPhotos = async (userId: string): Promise<PhotoResponse[]> => {
    const photos = await this.photosRepository.getAllUserPhotos(userId);
    return await Promise.all(
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
  };
}
export const photosService = new PhotosService(photosRepository);
