import { DefaultButton } from "./DefaultButton";

export function WhatsTheCode() {
  return (
    <section className="whats-the-code">
      <div className="container">
        <div className="whats-the-code__inner">
          <div className="whats-the-code__inner-content">
            <div className="whats-the-code__title-container">
              <h4 className="whats-the-code__title">What’s the code</h4>
            </div>
            <p className="whats-the-code__text">
              Enter the code sent to <span>+1 123-456-7890</span>
            </p>
            <input className="whats-the-code__input-code" maxLength={6}></input>
            <a className="whats-the-code__resend-code">Resend code</a>
            <div className="whats-the-code__button-container">
              <DefaultButton buttonText="Next"></DefaultButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
