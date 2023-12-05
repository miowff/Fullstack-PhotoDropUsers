export interface PaymentIntentDescription {
  userId: string;
  albumId: string;
}
export interface CreateStripeSession {
  toPay: number;
  currency: string;
  description: PaymentIntentDescription;
  productDescription: string;
}
export interface PaymentUrlResponse {
  paymentUrl: string;
}
