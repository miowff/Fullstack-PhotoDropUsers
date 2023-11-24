import { useRef, useState } from "react";
import NoProfilePicture from "../../public/images/NoProfilePicture.svg";
import { isMobile } from "react-device-detect";
import { UploadSelfieOptionsPopup } from "./UploadSelfieOptionsPopup";
import { MobileUploadOptions } from "./MobileUploadOptions";
import { SelfieEditPopUp } from "./SelfieEditPopUp";
export const AddASelfie = () => {
  const [isPopUpControlsVisible, setPopUpControlsVisible] =
    useState<boolean>(false);
  const [currentPic, setCurrentPic] = useState<string | File | null>(null);
  const [isSelfieEditVisible, setSelfieEditVisible] = useState<boolean>(
    currentPic !== null
  );
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="add-a-selfie">
      {isPopUpControlsVisible &&
        (!isMobile ? (
          <UploadSelfieOptionsPopup
            setSelectedFile={setCurrentPic}
            setSelfieEditVisible={setSelfieEditVisible}
            isVisible={setPopUpControlsVisible}
          />
        ) : (
          <div className="add-a-selfie__mobile-options">
            <MobileUploadOptions
              setSelfieEditVisible={setSelfieEditVisible}
              setSelectedFile={setCurrentPic}
              isVisible={setPopUpControlsVisible}
              controlButton={plusButtonRef}
            />
          </div>
        ))}
      {isSelfieEditVisible && (
        <SelfieEditPopUp
          setSelectedFile={setCurrentPic}
          setSelfieEditVisible={setSelfieEditVisible}
          setUploadOptionsVisible={setPopUpControlsVisible}
          currentPic={currentPic}
        />
      )}
      <div className="container">
        <div className="lets-get-started-inner add-a-selfie__inner">
          <div className="add-a-selfie__inner-content">
            <div className="add-a-selfie__title-container">
              <h4 className="default-title">Add a selfie</h4>
            </div>
            <p className="default-text add-a-selfie__text">
              A selfie allows your photos to be synced with your account.
            </p>
            <div className="add-a-selfie__prev-photo-container">
              <img
                className="add-a-selfie__prev-photo"
                src={NoProfilePicture}
                alt="profile pic"
              ></img>
              <button
                className="add-a-selfie__plus-button"
                onClick={() => {
                  if (isPopUpControlsVisible) {
                    setPopUpControlsVisible(false);
                  } else {
                    setPopUpControlsVisible(true);
                  }
                }}
                ref={plusButtonRef}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
