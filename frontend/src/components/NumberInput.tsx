import { DefaultButton } from "./DefaultButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
export function NumberInput() {
  return (
    <section className="number-input">
      <div className="container">
        <div className="number-input__inner">
          <div className="number-input__title-container">
            <h4 className="number-input__title">Let’s get started</h4>
          </div>
          <p className="number-input__text">Enter your phone number</p>
          <PhoneInput
            specialLabel={""}
            country={"us"}
            inputStyle={{
              height: "40px",
              width: "420px",
              fontFamily: "FuturaPtDefault",
              fontSize: "16px;",
            }}
          />
          <div className="number-input__button-container">
            <DefaultButton buttonText="Next" />
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
