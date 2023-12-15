import { useRef, useState } from "react";
import NoProfilePicture from "../../../public/images/NoProfilePicture.svg";
import { isMobile } from "react-device-detect";
import { UploadSelfieOptionsPopup } from "../UploadSelfieOptionsPopup/UploadSelfieOptionsPopup";
import { SelfieEditPopUp } from "../SelfieEditPopUp/SelfieEditPopUp";
export const AddASelfie = () => {
  const [isPopUpControlsVisible, setPopUpControlsVisible] =
    useState<boolean>(false);
  const [currentPic, setCurrentPic] = useState<string | File>("");
  const [isSelfieEditVisible, setSelfieEditVisible] = useState<boolean>(false);
  const photoUploadOptionsRef = useRef<HTMLInputElement>(null);
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const selectedImg = target.files[0];
      setCurrentPic(selectedImg);
      setSelfieEditVisible(true);
    }
  };
  return (
    <div className="add-a-selfie">
      {isPopUpControlsVisible && (
        <UploadSelfieOptionsPopup
          setSelectedFile={setCurrentPic}
          setSelfieEditVisible={setSelfieEditVisible}
          isVisible={setPopUpControlsVisible}
        />
      )}
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
                  if (isMobile) {
                    photoUploadOptionsRef.current?.click();
                  } else {
                    if (isPopUpControlsVisible) {
                      setPopUpControlsVisible(false);
                    } else {
                      setPopUpControlsVisible(true);
                    }
                  }
                }}
              >
                +
                {isMobile && (
                  <input
                    className="photo-upload-options"
                    ref={photoUploadOptionsRef}
                    type="file"
                    name="media_file"
                    accept="image/*"
                    onChange={handleOnChange}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
