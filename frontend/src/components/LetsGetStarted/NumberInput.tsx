import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { LetsGetStartedStages } from "../../enums/letsGetStartedStages";
import {
  StageContent,
  setCurrentStage,
} from "../../redux/letsGetStarted/letsGetStartedSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ErrorPopUp } from "../ErrorPopUp";
import { useRequestCode } from "../../hooks/userRequestCode";
export function NumberInput() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleStageChange = (newStage: StageContent) => {
    dispatch(setCurrentStage(newStage));
  };
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { handleRequest: requestCode } = useRequestCode({ setError });
  return (
    <section className="number-input">
      <div className="container">
        <ErrorPopUp message={error}></ErrorPopUp>
        <div className="number-input__inner">
          <div className="number-input__title-container">
            <h4 className="number-input__title">Let’s get started</h4>
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
              disabled={phoneNumber.length === 0}
              onClick={async () => {
                await requestCode(phoneNumber);
                handleStageChange({
                  enteredNumber: phoneNumber,
                  currentStage: LetsGetStartedStages.CONFIRM_NUMBER,
                });
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
}
