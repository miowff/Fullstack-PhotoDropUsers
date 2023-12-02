import { Album } from "src/db/entities/album";
import { IPaymentsService } from "./IServices/IPaymentsService";
import { IAlbumsRepository } from "src/db/IRepositories/IAlbumsRepository";
import { albumsRepository } from "src/db/repositories/albumsRepository";

class PaymentsService implements IPaymentsService {
  constructor(private readonly albumsRepository: IAlbumsRepository<Album>) {}
  createPaymentIntent = async (
    albumId: string,
    userId: string
  ): Promise<string> => {
    
  };
}
export const paymentsService = new PaymentsService(albumsRepository);
