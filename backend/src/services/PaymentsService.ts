import { Album } from "src/db/entities/album";
import { IPaymentsService } from "./IServices/IPaymentsService";
import { IAlbumsRepository } from "src/db/IRepositories/IAlbumsRepository";
import { albumsRepository } from "src/db/repositories/albumsRepository";
import { ApiError } from "src/errors/apiError";
import {
  CreateStripeSession,
  PaymentIntentDescription,
} from "src/models/payments";
import stripeService from "./utils/stripeService";

class PaymentsService implements IPaymentsService {
  constructor(private readonly albumsRepository: IAlbumsRepository<Album>) {}
  createPaymentIntent = async (
    albumId: string,
    userId: string
  ): Promise<string> => {
    const isUserHasAlbum = await this.albumsRepository.isUserHasAlbum(
      userId,
      albumId
    );
    if (!isUserHasAlbum) {
      throw new ApiError(
        `User with id:${userId} doesn't has album: ${albumId}`,
        400
      );
    }
    const isAlbumActivated = await this.albumsRepository.isAlbumActivated(
      albumId,
      userId
    );
    if (isAlbumActivated) {
      throw new ApiError(
        `User with id:${userId} already has album :${albumId}`,
        400
      );
    }
    const album = await this.albumsRepository.getAlbum(albumId);
    if (!album) {
      throw ApiError.NotFound("Album");
    }
    const { price: albumPrice, id, title } = album;
    const intentDescription: PaymentIntentDescription = {
      userId,
      albumId: id,
    };
    const createStripeSession: CreateStripeSession = {
      toPay: albumPrice * 100,
      currency: "usd",
      productDescription: title,
      description: intentDescription,
    };
    const paymentUrl = await stripeService.createSession(createStripeSession);
    return paymentUrl as string;
  };
}
export const paymentsService = new PaymentsService(albumsRepository);
