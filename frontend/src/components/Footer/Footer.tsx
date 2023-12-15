import FrameologyLogo from "../../public/images/FrameologyLogo.svg";
import ClimateNeutralLogo from "../../public/images/ClimateNeutralLogo.svg";
import { isMobile } from "react-device-detect";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__info">
              <h4 className="footer__info-title">
                PhotoDrop is brought to you by
              </h4>
              <a className="footer__info-company-logo">
                <img src={FrameologyLogo} alt="company-logo" />
              </a>
              <div className="footer__description">
                <p>
                  Our mission is to help people connect with their memories. If
                  you framing some of the photos from your experience, please
                  consider using Frameology. It supports the photographers and
                  makes PhotoDrop possible.
                </p>
              </div>
              <button className="footer__order-button">
                {isMobile ? "Frame a photo" : "Order photos"}
              </button>
            </div>
            <div className="footer__menu-container">
              <div className="footer__copyright">
                <p>© 2022 FOM Online Inc</p>
              </div>
              <nav className="footer__menu">
                <ul className="footer__menu-list">
                  <li className="footer__menu-item">
                    <a
                      className="footer__menu-link"
                      href="mailto:hello@photodrop.me"
                    >
                      Questions? Get in touch - hello@photodrop.me
                    </a>
                  </li>
                  <li className="footer__menu-item">
                    <a className="footer__menu-link" href="#">
                      <img
                        className="footer__menu-item-logo"
                        src={ClimateNeutralLogo}
                      />
                    </a>
                  </li>
                  <li className="footer__menu-item">
                    <a className="footer__menu-link">Terms of services</a>
                  </li>
                  <li className="footer__menu-item">
                    <a className="footer__menu-link">Privacy Party</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
