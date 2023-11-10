import { useState } from "react";
import { useSetEmailMutation } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { SetEmail } from "../../../../backend/src/models/user";
import { setUser } from "../../redux/user/authSlice";
import { isErrorWithMessage } from "../../utils/errorParser";
import { ErrorPopUp } from "../ErrorPopUp";
type WhatsYourEmailProps = {
  fullName: string;
};
export const WhatsYourEmail = ({ fullName }: WhatsYourEmailProps) => {
  const [email, setEmail] = useState<string>("");
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [setUserEmail] = useSetEmailMutation();
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
      navigate("/set-user-data");
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
                disabled={email.length === 0}
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
