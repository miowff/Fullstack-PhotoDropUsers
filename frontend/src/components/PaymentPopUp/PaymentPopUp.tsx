import { useRef, useState } from "react";
import { useHandleOutsideClick } from "../../hooks/useHandleOutsideClick";
import ApplePay from "../../public/images/ApplePayLogo.svg";
import PayPal from "../../public/images/PayPal.svg";
import { useLazyGetPaymentUrlQuery } from "../../api/albums";
interface PaymentPopUpProps {
  albumTitle: string;
  albumId: string;
  setPaymentPopUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PaymentPopUp = ({
  albumTitle,
  albumId,
  setPaymentPopUpVisible,
}: PaymentPopUpProps) => {
  const [getPaymentUrl] = useLazyGetPaymentUrlQuery();
  const [isUrlCreating, setIsUrlCreating] = useState<boolean>(false);
  const paymentPopUpArea = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(paymentPopUpArea, () => {
    setPaymentPopUpVisible(false);
  });
  const createPaymentIntent = async () => {
    setIsUrlCreating(true);
    const url = await getPaymentUrl(albumId).unwrap();
    setIsUrlCreating(false);
    window.location.href = url.paymentUrl;
  };
  return (
    <div className="payment-pop-up container-with-bg">
      <div className="payment-pop-up__container" ref={paymentPopUpArea}>
        <div className="payment-pop-up__inner">
          <span
            className="payment-pop-up__x-mark"
            onClick={() => {
              setPaymentPopUpVisible(false);
            }}
          ></span>
          <h1 className="payment-pop-up__title">Unlock your photos</h1>
          <div className="payment-pop-up__description">
            <p className="default-text payment-pop-up__text">
              Get all the photos from
              <span className="default-bold-text"> {albumTitle}</span> in
              hi-resolution with no watermark.
            </p>
            <p className="payment-pop-up__price">$5</p>
          </div>
          <div className="payment-pop-up__buttons">
            <>
              <button
                className="payment-pop-up__apple-pay-button"
                onClick={createPaymentIntent}
                disabled={isUrlCreating}
              >
                <img src={ApplePay} />
              </button>
              <div className="payment-pop-up__extra-payment-buttons">
                <button
                  className="payment-pop-up__stripe-button"
                  onClick={createPaymentIntent}
                  disabled={isUrlCreating}
                >
                  Checkout
                </button>
                <button
                  className="payment-pop-up__paypal-button"
                  onClick={createPaymentIntent}
                  disabled={isUrlCreating}
                >
                  <img src={PayPal} />
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
