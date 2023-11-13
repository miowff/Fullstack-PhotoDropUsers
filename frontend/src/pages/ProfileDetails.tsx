import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Header } from "../components/Header";
import NoProfilePicture from "../public/images/NoProfilePicture.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelfieEditPopUp } from "../components/SetUserData/SelfieEditPopUp";
import { UploadSelfieOptionsPopup } from "../components/SetUserData/UploadSelfieOptionsPopup";
export const ProfileDetails = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [profilePicLink, setProfilePicLink] =
    useState<string>(NoProfilePicture);
  const [fullName, setUserFullName] = useState<string | null>(null);
  const [email, setUserEmail] = useState<string | null>("");
  const [isSelfieEditVisible, setSelfieEditVisible] = useState<boolean>(false);
  const [isPopUpControlsVisible, setPopUpControlsVisible] =
    useState<boolean>(false);
  const [currentPic, setCurrentPic] = useState<string | File | null>(
    profilePicLink
  );
  useEffect(() => {
    if (user) {
      const { profilePhotoLink, fullName, email } = user;
      if (profilePhotoLink) {
        setCurrentPic(profilePhotoLink);
        setProfilePicLink(profilePhotoLink);
        setUserFullName(fullName);
        setUserEmail(email);
      }
    }
  }, [user]);

  return (
    <>
      <Header />
      {isPopUpControlsVisible && (
        <UploadSelfieOptionsPopup
          setPopUpControlsVisible={setPopUpControlsVisible}
          setSelfieEditVisible={setSelfieEditVisible}
          setSelectedFile={setCurrentPic}
        />
      )}
      {isSelfieEditVisible && (
        <SelfieEditPopUp
          isVisible={setSelfieEditVisible}
          isPopUpControlsVisible={setPopUpControlsVisible}
          currentPic={currentPic}
        />
      )}
      <div className="profile-details">
        <div className="container">
          <div className="profile-details__inner">
            <div className="profile-details__title-container">
              <h4 className="lets-get-started-title">
                Welcome{fullName ? `, ${fullName}` : ``}.
              </h4>
            </div>
            <div className="profile-details__content">
              <p className="profile-details__bold-text">Your selfie</p>
              <div className="profile-details__selfie-container">
                <img className="profile-details__selfie" src={profilePicLink} />
                <span
                  className="profile-details__edit-icon"
                  onClick={() => {
                    setSelfieEditVisible(true);
                  }}
                ></span>
              </div>
              <div className="profile-details__user-data-fields">
                <div className="profile-details__user-data-field">
                  <div
                    className="profile-details__user-data-field-content"
                    onClick={() => {
                      navigate("/set-full-name");
                    }}
                  >
                    <p className="profile-details__bold-text">
                      Your name{fullName ? `: ${fullName}` : ""}
                    </p>
                    <p className="default-text">
                      Tell us your name to personalize communications.
                    </p>
                  </div>
                  <span className="profile-details__right-arrow"></span>
                </div>
                <div className="profile-details__user-data-field">
                  <div
                    className="profile-details__user-data-field-content"
                    onClick={() => {
                      navigate("/set-email");
                    }}
                  >
                    <p className="profile-details__bold-text">
                      Your email{email ? `: ${email}` : ""}
                    </p>
                    <p className="default-text">
                      Tell us your email to personalize communications.
                    </p>
                  </div>
                  <span className="profile-details__right-arrow"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
