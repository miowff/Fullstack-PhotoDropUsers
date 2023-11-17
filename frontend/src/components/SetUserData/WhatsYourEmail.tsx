import { useEffect, useState } from "react";
import { useSetEmailMutation } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { SetEmail } from "../../../../backend/src/models/user";
import { setUser } from "../../redux/user/authSlice";
import { isErrorWithMessage } from "../../utils/errorParser";
import { ErrorPopUp } from "../ErrorPopUp";
import { useEnterKeyHandler } from "../../hooks/useEnterKeyHandler";
type WhatsYourEmailProps = {
  fullName: string;
};
export const WhatsYourEmail = ({ fullName }: WhatsYourEmailProps) => {
  const [email, setEmail] = useState<string>("");
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [setUserEmail] = useSetEmailMutation();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    email.length === 0
  );
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
      navigate("/");
    } catch (err) {
      const error = isErrorWithMessage(err);
      console.log(err);
      if (error) {
        setError(err.message);
      } else {
        setError("Unknown error");
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
        <ErrorPopUp message={error}></ErrorPopUp>
        <div className="lets-get-started-inner whats-your-email__inner">
          <div className="whats-your-email__inner-content">
            <div className="whats-your-email__title-container">
              <h4 className="lets-get-started-title">
                Hey there,
                <br />
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
            By continuing, you indicate that you have read and agree to our
            <a href="#"> Terms of Use</a> & <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};
