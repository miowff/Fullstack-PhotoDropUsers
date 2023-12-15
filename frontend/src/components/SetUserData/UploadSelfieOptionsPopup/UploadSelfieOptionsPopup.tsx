import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useHandleOutsideClick } from "../../../hooks/useHandleOutsideClick";
import { toFile } from "../../../utils/toFile";
interface UploadSelfieOptions {
  isVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | File>>;
  setSelfieEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UploadSelfieOptionsPopup = ({
  isVisible,
  setSelfieEditVisible,
  setSelectedFile,
}: UploadSelfieOptions) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOpened, setCameraOpened] = useState<boolean>(false);
 
  const popupRef = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(popupRef, () => {
    isVisible(false);
  });
  const capture = () => {
    if (webcamRef.current) {
      const capturedImageSrc = webcamRef.current.getScreenshot();
      if (capturedImageSrc) {
        const capturedFile = toFile(capturedImageSrc);
        setSelectedFile(capturedFile);
      }
      setCameraOpened(false);
      isVisible(false);
      setSelfieEditVisible(true);
    }
  };
  return (
    <div className="pop-up-selfie-upload-options">
      <div className="pop-up-selfie-upload-options__container">
        <div className="pop-up-selfie-upload-options__default">
          {isCameraOpened && (
            <div className="pop-up-selfie-upload-options__webcam-container">
              <div
                className="pop-up-selfie-upload-options__webcam"
                ref={popupRef}
              >
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  height={720}
                  width={1280}
                  screenshotFormat="image/jpeg"
                />
                <div className="pop-up-selfie-upload-option__webcam-buttons-container">
                  <button
                    className="pop-up-selfie-upload-options__camera-button pop-up-selfie-upload-options__camera-save-button"
                    onClick={capture}
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
            <div ref={popupRef} className="pop-up-selfie-upload-options__inner">
              <div className="pop-up-selfie-upload-options__content">
                <span
                  className="pop-up-selfie-upload-options__x-mark"
                  onClick={() => {
                    isVisible(false);
                  }}
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
                        onChange={({ target }) => {
                          if (target.files) {
                            const selectedPic = target.files[0];
                            setSelectedFile(selectedPic);
                            isVisible(false);
                            setSelfieEditVisible(true);
                          }
                        }}
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
      </div>
    </div>
  );
};
