export interface IPaymentsService {
  createPaymentIntent(albumId: string, userId: string): Promise<string>;
}
