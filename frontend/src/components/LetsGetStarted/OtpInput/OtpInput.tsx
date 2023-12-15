import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface OTPInputProps {
  onChangeOTP: (otp: string) => void;
}
let currentIndex = 0;
export const InputOtp = ({ onChangeOTP }: OTPInputProps) => {
  const otpLength = 6;
  const [currentOtpIndex, setCurrentOtpIndex] = useState(0);
  const [otp, setOtp] = useState(Array<string>(otpLength).fill(""));
  const inputRef = useRef<HTMLInputElement>();
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentIndex] = value.substring(value.length - 1);
    if (/^[a-zA-Z]$/.test(value)) {
      return;
    }
    if (!value) {
      setCurrentOtpIndex(currentIndex - 1);
    } else {
      setCurrentOtpIndex(currentIndex + 1);
    }
    setOtp(newOtp);
    onChangeOTP(newOtp.join(""));
  };
  const handleOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = event;
    currentIndex = index;
    if (key === "Backspace") {
      event.preventDefault();
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      const prevIndex = index > 0 ? index - 1 : 0;
      if (otp[index] === "") {
        setCurrentOtpIndex(prevIndex);
      }
      setOtp(updatedOtp);
    }
  };
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const data = e.clipboardData.getData("text/plain");
      if (/[a-zA-Z]/.test(data)) {
        return;
      }
      if (data.length < 6) {
        return;
      }
      const newOtp = data.substring(0, 6).split("");
      setOtp(newOtp);
      setCurrentOtpIndex(newOtp.length - 1);
      onChangeOTP(newOtp.join(""));
    },
    [onChangeOTP]
  );
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentOtpIndex]);
  return (
    <div className="otp-input-container">
      {otp.map((digit, index) => (
        <input
          className="otp-input-box"
          type="number"
          key={index}
          value={digit}
          ref={
            index === currentOtpIndex
              ? (inputRef as RefObject<HTMLInputElement>)
              : null
          }
          onChange={handleOnChange}
          onKeyDown={(e) => {
            handleOnKeyDown(e, index);
          }}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};
