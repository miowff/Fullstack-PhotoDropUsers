import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoginRegistrationModel } from "../../../../../backend/src/models/user";
import { useLoginOrRegisterMutation } from "../../../api/auth";
import { useNavigate, useParams } from "react-router-dom";
import { setToken, setUser } from "../../../redux/user/authSlice";
import { useEnterKeyHandler } from "../../../hooks/useEnterKeyHandler";
import { useResendCode } from "../../../hooks/useResendCode";
import { InputOtp } from "../OtpInput/OtpInput";
import { Alert, AlertData } from "../../Alert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
export const WhatsTheCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { phoneNumber: enteredNumber } = useParams();
  useEffect(() => {
    if (enteredNumber === null) {
      navigate("/number-input");
    }
  }, [enteredNumber, navigate]);
  const [code, setCode] = useState<string>("");
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [loginOrRegisterUser] = useLoginOrRegisterMutation();
  const { handleRequest: requestCode } = useResendCode({ setAlert });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    code.length !== 6
  );
  useEffect(() => {
    setIsButtonDisabled(code.length !== 6);
  }, [code]);
  const loginOrRegister = async (request: LoginRegistrationModel) => {
    try {
      setIsButtonDisabled(true);
      const loginRequestResult = await loginOrRegisterUser(request).unwrap();
      const { tokens, currentUser } = loginRequestResult;
      dispatch(setUser(currentUser));
      dispatch(setToken(tokens));
      setIsButtonDisabled(false);
      navigate("/");
    } catch (err) {
      const { data } = err as FetchBaseQueryError;
      if (data) {
        setAlert({ message: data as string, isError: true });
      } else {
        setAlert({ message: "Unknown error", isError: true });
      }
      setIsButtonDisabled(false);
    }
  };
  useEnterKeyHandler(async () => {
    if (enteredNumber) {
      await loginOrRegister({ phoneNumber: enteredNumber, code });
    }
  });
  return (
    <section className="whats-the-code">
      <div className="container">
        <Alert
          data={alert}
          onClose={() => {
            setAlert(null);
          }}
        ></Alert>
        <div className="lets-get-started-inner whats-the-code__inner">
          <div className="whats-the-code__inner-content">
            <div className="whats-the-code__title-container">
              <h4 className="default-title whats-the-code__title">
                What’s the code?
              </h4>
            </div>
            <p className="whats-the-code__text">
              Enter the code sent to <span>+{enteredNumber}</span>
            </p>
            <div className="whats-the-code__input-container">
              <InputOtp onChangeOTP={setCode} />
            </div>
            <a
              className="whats-the-code__resend-code"
              onClick={async () => {
                if (enteredNumber) {
                  await requestCode(enteredNumber);
                }
              }}
            >
              Resend code
            </a>
            <div className="whats-the-code__button-container">
              <button
                className="default-button"
                disabled={isButtonDisabled}
                onClick={async () => {
                  if (enteredNumber) {
                    await loginOrRegister({ phoneNumber: enteredNumber, code });
                  }
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
