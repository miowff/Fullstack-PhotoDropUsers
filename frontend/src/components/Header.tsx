import PhotoDropLogo from "../public/images/PhotoDropLogo.png";
import NoProfilePicture from "../public/images/NoProfilePicture.svg";
import { useNavigate, useLocation } from "react-router-dom";
export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <a className="header__inner-logo">
            <img
              src={PhotoDropLogo}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            ></img>
          </a>
          {pathname !== "/start" && (
            <a className="header__profile-thumb">
              <img src={NoProfilePicture} alt="profile thumbnail"></img>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
