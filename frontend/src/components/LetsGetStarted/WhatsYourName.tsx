import { useState } from "react";

export function WhatsYourName() {
  const [name, setName] = useState<string>("");
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div className="whats-your-name">
      <div className="container">
     
        <div className="lets-get-started-inner">
          <div className="whats-your-name__inner-content">
            <div className="whats-your-name__title-container">
              <h4 className="whats-the-code__title">Let’s get to know you</h4>
            </div>
            <input
              className="whats-your-name__input-name"
              placeholder="What's your name?"
              onChange={handleNameInput}
            ></input>
            <div className="whats-your-name__button-container">
              <button className="default-button" disabled={name.length === 0}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
