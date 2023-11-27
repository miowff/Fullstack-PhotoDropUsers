import { useEffect } from "react";

type AlertProps = {
  data: AlertData | null;
  onClose: () => void;
};
export interface AlertData {
  message: string;
  isError: boolean;
}
export const Alert = ({ data, onClose }: AlertProps) => {
  useEffect(() => {
    if (data) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [data, onClose]);
  if (!data) {
    return null;
  }
  const { message, isError } = data;
  const alertClassName = isError ? "alert__error" : "alert__success";
  return (
    <>
      <div className="alert">
        <div className={alertClassName}>
          <p className="alert__text">{message}</p>
        </div>
      </div>
    </>
  );
};
