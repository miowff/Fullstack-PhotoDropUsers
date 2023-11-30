import { PhotoResponse } from "./photo";

export interface AlbumModel {
  albumId: string;
  title: string;
  previewPhotoLink: string;
}
export interface AlbumWithPhotos {
  title: string;
  createdDate: string;
  isActivated: boolean;
  photos: PhotoResponse[];
}
