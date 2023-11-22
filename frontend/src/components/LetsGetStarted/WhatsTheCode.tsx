import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ErrorPopUp } from "../ErrorPopUp";
import { LoginRegistrationModel } from "../../../../backend/src/models/user";
import { useLoginOrRegisterMutation } from "../../api/auth";
import { isErrorWithMessage } from "../../utils/errorParser";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../redux/user/authSlice";
import { useEnterKeyHandler } from "../../hooks/useEnterKeyHandler";
import { useResendCode } from "../../hooks/useResendCode";
import { InputOtp } from "./OtpInput";
export const WhatsTheCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enteredNumber } = useSelector(
    (state: RootState) => state.letsGetStartedStages.letsGetStarted
  );
  useEffect(() => {
    if (enteredNumber === null) {
      navigate("/number-input");
    }
  }, [enteredNumber, navigate]);
  const [code, setCode] = useState<string>("");

  const [error, setError] = useState("");
  const [loginOrRegisterUser] = useLoginOrRegisterMutation();
  const { handleRequest: requestCode } = useResendCode({ setError });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    code.length !== 6
  );
  useEffect(() => {
    setIsButtonDisabled(code.length !== 6);
  }, [code]);
  const loginOrRegister = async (request: LoginRegistrationModel) => {
    try {
      setIsButtonDisabled(true);
      const { tokens, currentUser } = await loginOrRegisterUser(
        request
      ).unwrap();
      dispatch(setUser(currentUser));
      dispatch(setToken(tokens));
      setIsButtonDisabled(false);
      console.log(currentUser);
      navigate("/");
    } catch (err) {
      const error = isErrorWithMessage(err);
      if (error) {
        setError(err.message);
      } else {
        setError("Unknown error");
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
        <ErrorPopUp message={error}></ErrorPopUp>
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
                    console.log(code);
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
