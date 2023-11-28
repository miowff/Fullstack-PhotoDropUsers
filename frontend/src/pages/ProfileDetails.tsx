import { Header } from "../components/Header";
import NoProfilePicture from "../public/images/NoProfilePicture.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelfieEditPopUp } from "../components/SetUserData/SelfieEditPopUp";
import { UploadSelfieOptionsPopup } from "../components/SetUserData/UploadSelfieOptionsPopup";
import { useGetCurrentUserQuery } from "../api/auth";
export const ProfileDetails = () => {
  const navigate = useNavigate();
  const { data: user, isFetching, isLoading } = useGetCurrentUserQuery();
  const [isSelfieEditVisible, setSelfieEditVisible] = useState<boolean>(false);
  const [isPopUpControlsVisible, setPopUpControlsVisible] =
    useState<boolean>(false);
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [currentPic, setCurrentPic] = useState<string | File | null>(
    NoProfilePicture
  );
  useEffect(() => {
    if (user) {
      const { fullName, email, profilePhotoLink } = user;
      setFullName(fullName);
      setEmail(email);
      if (currentPic) {
        setCurrentPic(profilePhotoLink);
      }
    }
  }, [user]);
  return (
    <>
      {!isFetching && !isLoading && user && (
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
                      src={currentPic as string}
                    />
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
