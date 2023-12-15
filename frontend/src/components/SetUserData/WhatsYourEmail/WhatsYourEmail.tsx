import { useEffect, useState } from "react";
import { useSetEmailMutation } from "../../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { SetEmail } from "../../../../../backend/src/models/user";
import { setUser } from "../../../redux/user/authSlice";
import { isErrorWithMessage } from "../../../utils/errorParser";
import { useEnterKeyHandler } from "../../../hooks/useEnterKeyHandler";
import { Alert, AlertData } from "../../Alert";
import { useAuth } from "../../../hooks/useAuth";
type WhatsYourEmailProps = {
  fullName: string;
};
export const WhatsYourEmail = ({ fullName }: WhatsYourEmailProps) => {
  const [email, setEmail] = useState<string>("");
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [alert, setAlert] = useState<AlertData | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [setUserEmail] = useSetEmailMutation();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    email.length === 0
  );
  const isAuth = useAuth();
  const setEmailRequest = async (request: SetEmail) => {
    try {
      const newEmail = await setUserEmail(request).unwrap();
      if (user) {
        const updatedUser = {
          ...user,
          email: newEmail,
        };
        dispatch(setUser(updatedUser));
      }
      if (isAuth) {
        return navigate("/me");
      }
      return navigate("/");
    } catch (err) {
      const error = isErrorWithMessage(err);
      if (error) {
        const { message } = err;
        setAlert({ message, isError: true });
      } else {
        setAlert({ message: "Unknown error", isError: true });
      }
    }
  };
  useEffect(() => {
    setIsButtonDisabled(email.length === 0);
  }, [email]);
  useEnterKeyHandler(async () => {
    setIsButtonDisabled(true);
    await setEmailRequest({ email });
    setIsButtonDisabled(false);
  });
  return (
    <div className="whats-your-email">
      <div className="container">
        <Alert
          data={alert}
          onClose={() => {
            setAlert(null);
          }}
        ></Alert>
        <div className="lets-get-started-inner whats-your-email__inner">
          <div className="whats-your-email__inner-content">
            <div className="whats-your-email__title-container">
              <h4 className="default-title">
                Hey there,
                {fullName}! 👋
              </h4>
            </div>
            <input
              className="default-input whats-your-email__input"
              placeholder="What's your email?"
              onChange={handleEmailInput}
            ></input>
            <div className="whats-your-email__button-container">
              <button
                className="default-button"
                disabled={isButtonDisabled}
                onClick={async () => {
                  await setEmailRequest({ email });
                }}
              >
                See your photos!
              </button>
            </div>
          </div>
          <p className="whats-your-email__privacy-policy">
            By continuing, you indicate that you have read and agree to our{" "}
            <a
              onClick={() => {
                navigate("/terms-of-use");
              }}
            >
              Terms of Use
            </a>{" "}
            &{" "}
            <a
              onClick={() => {
                navigate("/privacy-policy");
              }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
