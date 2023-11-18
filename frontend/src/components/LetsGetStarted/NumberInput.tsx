import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  StageContent,
  setCurrentStage,
} from "../../redux/letsGetStarted/letsGetStartedSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ErrorPopUp } from "../ErrorPopUp";
import { useNavigate } from "react-router-dom";
import { useEnterKeyHandler } from "../../hooks/useEnterKeyHandler";
import { useRequestCode } from "../../hooks/useRequestCode";

export const NumberInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePhoneNumberInput = (newStage: StageContent) => {
    dispatch(setCurrentStage(newStage));
  };
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState("");
  const { handleRequest: requestCode } = useRequestCode({ setError });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    phoneNumber.length === 0
  );
  useEffect(() => {
    setIsButtonDisabled(phoneNumber.length === 0);
  }, [phoneNumber]);
  const handleNextAction = async () => {
    setIsButtonDisabled(true);
    await requestCode(phoneNumber);
    handlePhoneNumberInput({
      enteredNumber: phoneNumber,
    });
    setIsButtonDisabled(false);
    navigate("/code-input");
  };
  useEnterKeyHandler(handleNextAction);
  return (
    <section className="number-input">
      <div className="container">
        <ErrorPopUp message={error}></ErrorPopUp>
        <div className="lets-get-started-inner">
          <div className="number-input__title-container">
            <h4 className="lets-get-started-title">Let’s get started</h4>
          </div>
          <p className="number-input__text">Enter your phone number</p>
          <PhoneInput
            specialLabel={""}
            country={"us"}
            value={phoneNumber}
            onChange={setPhoneNumber}
            inputStyle={{
              height: "40px",
              width: "420px",
              fontFamily: "FuturaPtDefault",
            }}
          />
          <div className="number-input__button-container">
            <button
              className="default-button"
              disabled={isButtonDisabled}
              onClick={async () => {
                await handleNextAction();
              }}
            >
              Next
            </button>
          </div>
          <div className="number-input__text-container">
            <p>
              By proceeding, you consent to get WhatsApp or SMS messages, from
              PhotoDrop and its affiliates to the number provided. Text “STOP”
              to 89203 to opt out.
            </p>
          </div>
          <div className="number-input__text-container">
            <p>
              By continuing, you indicate that you have read and agree to our
              <a href="#"> Terms of Use</a> & <a href="#"> Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
