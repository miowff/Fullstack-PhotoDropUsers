import PhotoDropLogo from "../public/images/PhotoDropLogo.png";
import NoProfilePicture from "../public/images/NoProfilePicture.svg";
export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <a className="header__inner-logo">
            <img src={PhotoDropLogo} alt="logo"></img>
          </a>
          <a className="header__profile-thumb">
            <img src={NoProfilePicture} alt="profile thumbnail"></img>
          </a>
        </div>
      </div>
    </header>
  );
}
