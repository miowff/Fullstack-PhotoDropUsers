import { useState } from "react";
import NoProfilePicture from "../../public/images/NoProfilePicture.svg";
import { UploadSelfieOptionsPopup } from "./UploadSelfieOptionsPopup";
import { SelfieEditPopUp } from "./SelfieEditPopUp";
export const AddASelfie = () => {
  const [isPopUpControlsVisible, setPopUpControlsVisible] =
    useState<boolean>(false);
  const [currentPic, setCurrentPic] = useState<string | File | null>(null);
  const [isSelfieEditVisible, setSelfieEditVisible] = useState<boolean>(
    currentPic !== null
  );

  return (
    <div className="add-a-selfie">
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
      <div className="container">
        <div className="lets-get-started-inner add-a-selfie__inner">
          <div className="add-a-selfie__inner-content">
            <div className="add-a-selfie__title-container">
              <h4 className="lets-get-started-title">Add a selfie</h4>
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
                  setPopUpControlsVisible(true);
                }}
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
