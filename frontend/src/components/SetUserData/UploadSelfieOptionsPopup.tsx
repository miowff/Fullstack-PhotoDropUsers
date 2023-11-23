import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { toFile } from "../../utils/toFile";
import { useIsOnScreen } from "../../hooks/useOnScreen";
import React from "react";

interface PopUpOptionsProps {
  setPopUpControlsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelfieEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | File | null>>;
}
export const UploadSelfieOptionsPopup = ({
  setPopUpControlsVisible,
  setSelectedFile,
  setSelfieEditVisible,
}: PopUpOptionsProps) => {
  const webcamRef = useRef<Webcam>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const pcRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLInputElement | null>(null);
  const isMobilePopUpOnScreen = useIsOnScreen(mobileRef);
  const isPcPopOnScreen = useIsOnScreen(pcRef);
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
  const handleSelectImageChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const selectedPic = target.files[0];
      setSelectedFile(selectedPic);
      setSelfieEditVisible(true);
      setPopUpControlsVisible(false);
    }
  };
  const openCamera = () => {
    if (mobileVideoRef.current) {
      mobileVideoRef.current.click();
    }
  };
  useEffect(() => {
    let element = React.createRef<HTMLDivElement>();
    if (isMobilePopUpOnScreen) {
      element = mobileRef;
    } else if (isPcPopOnScreen) {
      element = pcRef;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (element.current && !element.current.contains(event.target as Node)) {
        setPopUpControlsVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobilePopUpOnScreen, isPcPopOnScreen, setPopUpControlsVisible]);
  return (
    <div className="pop-up-selfie-upload-options">
      <div ref={mobileRef} className="pop-up-selfie-upload-options__mobile">
        <div className="pop-up-selfie-upload-options__add-dropdown">
          <ul className="pop-up-selfie-upload-options__upload-photo-options">
            <li
              className="pop-up-selfie-upload-options__upload-photo-option"
              onClick={openCamera}
            >
              <p className="photo-library">Photo Library</p>
              <input
                ref={mobileVideoRef}
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
                onChange={handleSelectImageChange}
              ></input>
            </li>
            <li className="pop-up-selfie-upload-options__upload-photo-option">
              <p className="take-photo">Take Photo</p>
            </li>
            <li className="pop-up-selfie-upload-options__upload-photo-option">
              <p className="chose-file">Chose File</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="pop-up-selfie-upload-options__container">
        <div className="pop-up-selfie-upload-options__default">
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
            <div ref={pcRef} className="pop-up-selfie-upload-options__inner">
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
      </div>
    </div>
  );
};
