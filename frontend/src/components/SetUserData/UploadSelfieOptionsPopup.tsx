import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { toFile } from "../../utils/toFile";

interface PopUpOptionsProps {
  setPopUpControlsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelfieEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}
export const UploadSelfieOptionsPopup = ({
  setPopUpControlsVisible,
  setSelectedFile,
  setSelfieEditVisible,
}: PopUpOptionsProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOpened, setCameraOpened] = useState<boolean>(false);
  const capture = () => {
    if (webcamRef.current) {
      const capturedImageSrc = webcamRef.current.getScreenshot();
      if (capturedImageSrc) {
        const capturedFile = toFile(capturedImageSrc);
        setSelectedFile(capturedFile);
      }
      setCameraOpened(false);
      setSelfieEditVisible(true);
      setPopUpControlsVisible(false);
    }
  };
  const handleSelectImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedPic = e.target.files[0];
      setSelectedFile(selectedPic);
      setSelfieEditVisible(true);
      setPopUpControlsVisible(false);
    }
  };
  return (
    <div className="pop-up-selfie-upload-options">
      {isCameraOpened && (
        <div className="pop-up-selfie-upload-options__webcam-container">
          <div className="container">
            <Webcam
              audio={false}
              height={720}
              width={1280}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <div className="pop-up-selfie-upload-option__webcam-buttons-container">
              <button
                className="pop-up-selfie-upload-options__camera-button pop-up-selfie-upload-options__camera-save-button"
                onClick={() => {
                  capture();
                }}
              >
                Capture Photo
              </button>
              <button
                className="pop-up-selfie-upload-options__camera-button pop-up-selfie-upload-options__close-camera-button"
                onClick={() => {
                  setCameraOpened(false);
                }}
              >
                Close camera
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="pop-up-selfie-upload-options__inner">
          <div className="pop-up-selfie-upload-options__content">
            <span
              className="pop-up-selfie-upload-options__x-mark"
              onClick={() => setPopUpControlsVisible(false)}
            ></span>
            <h6 className="pop-up-selfie-upload-options__title">
              Upload options
            </h6>
            <div className="pop-up-selfie-upload-options__buttons-container">
              <div className="pop-up-selfie-upload-options__input-wrapper">
                <label
                  htmlFor="fileInput"
                  className="pop-up-selfie-upload-options__input-button"
                >
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleSelectImageChange}
                  />
                  <span>Select a file</span>
                </label>
              </div>
              <div className="pop-up-selfie-upload-options__input-wrapper">
                <button
                  className="pop-up-selfie-upload-options__input-button"
                  onClick={() => {
                    setCameraOpened(true);
                  }}
                >
                  Use camera
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
