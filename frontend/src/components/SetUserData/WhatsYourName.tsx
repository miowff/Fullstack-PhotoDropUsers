import { useState } from "react";
import { useSetFullNameMutation } from "../../api/user";
import { SetFullName } from "../../../../backend/src/models/user";
import { isErrorWithMessage } from "../../utils/errorParser";
import { ErrorPopUp } from "../ErrorPopUp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/user/authSlice";

export const WhatsYourName = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [name, setName] = useState<string>("");
  const [error, setError] = useState("");
  const [setFullNameRequest] = useSetFullNameMutation();
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const setFullName = async (request: SetFullName) => {
    try {
      const newName = await setFullNameRequest(request).unwrap();
      if (user) {
        const updatedUser = {
          ...user,
          fullName: newName,
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

  return (
    <div className="whats-your-name">
      <div className="container">
        <ErrorPopUp message={error}></ErrorPopUp>
        <div className="lets-get-started-inner">
          <div className="whats-your-name__inner-content">
            <div className="whats-your-name__title-container">
              <h4 className="lets-get-started-title">Let’s get to know you</h4>
            </div>
            <input
              className="default-input whats-your-name__input-name"
              placeholder="What's your name?"
              onChange={handleNameInput}
            ></input>
            <div className="whats-your-name__button-container">
              <button
                className="default-button"
                disabled={name.length === 0}
                onClick={async () => {
                  await setFullName({ name });
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
