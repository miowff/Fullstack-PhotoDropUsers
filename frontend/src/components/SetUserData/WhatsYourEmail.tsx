import { useState } from "react";
type WhatsYourEmailProps = {
  fullName: string;
};
export const WhatsYourEmail = ({ fullName }: WhatsYourEmailProps) => {
  const [email, setEmail] = useState<string>("");
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <div className="whats-your-email">
      <div className="container">
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
              <button className="default-button" disabled={email.length === 0}>
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
