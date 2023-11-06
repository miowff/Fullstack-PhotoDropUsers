import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ErrorPopUp } from "../ErrorPopUp";
import { useRequestCode } from "../../hooks/userRequestCode";
import { LoginRegistrationModel } from "../../../../backend/src/models/user";
import { useLoginOrRegisterMutation } from "../../api/auth";
import { isErrorWithMessage } from "../../utils/errorParser";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/user/authSlice";
export function WhatsTheCode() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enteredNumber } = useSelector(
    (state: RootState) => state.letsGetStartedStages.letsGetStartedStages
  );
  const [code, setCode] = useState<string>("");
  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const [error, setError] = useState("");
  const [loginOrRegisterUser] = useLoginOrRegisterMutation();
  const { handleRequest: requestCode } = useRequestCode({ setError });
  const loginOrRegister = async (request: LoginRegistrationModel) => {
    try {
      const tokens = await loginOrRegisterUser(request).unwrap();
      dispatch(setToken(tokens));
      navigate("/");
    } catch (err) {
      const error = isErrorWithMessage(err);
      if (error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  };
  return (
    <section className="whats-the-code">
      <div className="container">
        <ErrorPopUp message={error}></ErrorPopUp>
        <div className="whats-the-code__inner">
          <div className="whats-the-code__inner-content">
            <div className="whats-the-code__title-container">
              <h4 className="whats-the-code__title">What’s the code</h4>
            </div>
            <p className="whats-the-code__text">
              Enter the code sent to <span>+{enteredNumber}</span>
            </p>
            <input
              className="whats-the-code__input-code"
              maxLength={6}
              onChange={handleCodeInput}
            ></input>
            <a
              className="whats-the-code__resend-code"
              onClick={async () => {
                await requestCode(enteredNumber);
              }}
            >
              Resend code
            </a>
            <div className="whats-the-code__button-container">
              <button
                className="default-button"
                disabled={code.length !== 6}
                onClick={async () => {
                  await loginOrRegister({ phoneNumber: enteredNumber, code });
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
}
