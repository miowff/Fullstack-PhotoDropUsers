import { PhotoResponse } from "src/models/photo";

export interface IPhotosService {
  getAllUserPhotos(userId: string): Promise<PhotoResponse[]>;
}
