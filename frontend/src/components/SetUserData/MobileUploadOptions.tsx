import React, { useRef } from "react";
import { useHandleOutsideClick } from "../../hooks/useHandleOutsideClick";
interface MobileUploadProps {
  isVisible: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
  setSelectedFile: React.Dispatch<React.SetStateAction<string | File>>;
  setSelfieEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  controlButton: React.RefObject<HTMLElement>;
}
export const MobileUploadOptions = ({
  isVisible,
  setSelectedFile,
  controlButton,
  setSelfieEditVisible,
}: MobileUploadProps) => {
  const mobileSelfieInputRef = useRef<HTMLInputElement | null>(null);
  const mobileStorageInputRef = useRef<HTMLInputElement | null>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(
    optionsRef,
    () => {
      isVisible(false);
    },
    [controlButton]
  );
  const openCamera = () => {
    if (mobileSelfieInputRef.current) {
      mobileSelfieInputRef.current.click();
    }
  };
  const openGallery = () => {
    if (mobileStorageInputRef.current) {
      mobileStorageInputRef.current.click();
    }
  };
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const selectedImg = target.files[0];
      setSelectedFile(selectedImg);
      isVisible(false);
      setSelfieEditVisible(true);
    }
  };
  return (
    <div ref={optionsRef} className="mobile-options">
      <div className="mobile-options__add-dropdown">
        <ul className="mobile-options__upload-photo-options">
          <li className="mobile-options__upload-photo-option">
            <a className="photo-library">Photo Library</a>
          </li>
          <li
            className="mobile-options__upload-photo-option"
            onClick={openCamera}
          >
            <input
              ref={mobileSelfieInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={handleOnChange}
            ></input>
            <a className="take-photo">Take Photo</a>
          </li>
          <li
            className="mobile-options__upload-photo-option"
            onClick={openGallery}
          >
            <input
              ref={mobileStorageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleOnChange}
            />
            <a className="chose-file">Chose File</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
