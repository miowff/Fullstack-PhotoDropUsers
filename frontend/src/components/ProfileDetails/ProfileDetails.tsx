import { Header } from "../../components/Header/Header";
import NoProfilePicture from "../../public/images/NoProfilePicture.svg";
import PenIcon from "../../public/images/PenIcon.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelfieEditPopUp } from "../../components/SetUserData/SelfieEditPopUp/SelfieEditPopUp";
import { UploadSelfieOptionsPopup } from "../../components/SetUserData/UploadSelfieOptionsPopup/UploadSelfieOptionsPopup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
export const ProfileDetails = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSelfieEditVisible, setSelfieEditVisible] = useState<boolean>(false);
  const [isUserPhotoLoaded, setIsUserPhotoLoaded] = useState<boolean>(false);
  const [isPopUpControlsVisible, setPopUpControlsVisible] =
    useState<boolean>(false);
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [currentPic, setCurrentPic] = useState<string | File>(NoProfilePicture);
  const [profilePhoto, setProfilePhoto] = useState<string>(NoProfilePicture);
  useEffect(() => {
    if (user) {
      const { fullName, email, profilePhotoLink } = user;
      setFullName(fullName);
      setEmail(email);
      if (profilePhotoLink) {
        setCurrentPic(profilePhotoLink);
        setProfilePhoto(profilePhotoLink);
      }
    }
  }, [user]);
  useEffect(() => {
    if (typeof currentPic === "string") {
      setProfilePhoto(currentPic);
    }
  }, [currentPic]);
  return (
    <>
      {user && (
        <>
          <Header />
          {isPopUpControlsVisible && (
            <UploadSelfieOptionsPopup
              isVisible={setPopUpControlsVisible}
              setSelfieEditVisible={setSelfieEditVisible}
              setSelectedFile={setCurrentPic}
            />
          )}
          {isSelfieEditVisible && (
            <SelfieEditPopUp
              currentPic={currentPic}
              setSelectedFile={setCurrentPic}
              setSelfieEditVisible={setSelfieEditVisible}
              setUploadOptionsVisible={setPopUpControlsVisible}
            />
          )}
          <div className="profile-details">
            <div className="container">
              <div className="profile-details__inner">
                <div className="profile-details__title-container">
                  <h4 className="profile-details__title">
                    Welcome{fullName ? `, ${fullName}` : ``}.
                  </h4>
                </div>
                <div className="profile-details__content">
                  <p className="profile-details__bold-text">Your selfie</p>
                  <div className="profile-details__selfie-container">
                    <img
                      className="profile-details__selfie"
                      src={isUserPhotoLoaded ? profilePhoto : NoProfilePicture}
                      onLoad={() => {
                        setIsUserPhotoLoaded(true);
                      }}
                    />
                    <span
                      className="profile-details__edit-icon"
                      onClick={() => {
                        setSelfieEditVisible(true);
                      }}
                    >
                      <img src={PenIcon} />
                    </span>
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
                        <p className="profile-details__text">
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
                        <p className="profile-details__text">
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
      )}
    </>
  );
};
