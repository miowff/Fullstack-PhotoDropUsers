import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  StageContent,
  setCurrentStage,
} from "../../../redux/letsGetStarted/letsGetStartedSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnterKeyHandler } from "../../../hooks/useEnterKeyHandler";
import { useRequestCode } from "../../../hooks/useRequestCode";
import { Alert, AlertData } from "../../Alert";

export const NumberInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePhoneNumberInput = (newStage: StageContent) => {
    dispatch(setCurrentStage(newStage));
  };
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [alert, setAlert] = useState<AlertData | null>(null);
  const { handleRequest: requestCode } = useRequestCode({ setAlert });
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
    navigate(`/code-input/${phoneNumber}`);
  };
  useEnterKeyHandler(handleNextAction);
  return (
    <section className="number-input">
      <div className="container">
        <Alert
          data={alert}
          onClose={() => {
            setAlert(null);
          }}
        ></Alert>
        <div className="number-input__inner">
          <div className="number-input__title-container">
            <h4 className="default-title number-input__title">
              Let’s get started
            </h4>
          </div>
          <div className="number-input__content">
            <p className="number-input__text">Enter your phone number</p>
            <PhoneInput
              specialLabel={""}
              country={"us"}
              value={phoneNumber}
              onChange={setPhoneNumber}
              inputClass="number-input__input"
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

            <div className="number-input__privacy-policy">
              <div className="number-input__text-container">
                <p>
                  By proceeding, you consent to get WhatsApp or SMS messages,
                  from PhotoDrop and its affiliates to the number provided. Text
                  “STOP” to 89203 to opt out.
                </p>
              </div>
              <div className="number-input__privacy-policy-container">
                <p>
                  By continuing, you indicate that you have read and agree to
                  our{" "}
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
        </div>
      </div>
    </section>
  );
};
