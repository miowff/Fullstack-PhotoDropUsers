import { useEffect, useState } from "react";
import NoProfilePicture from "../../public/images/NoProfilePicture.svg";
interface SelfieEditProps {
  isVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isPopUpControlsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentPic: string | File | null;
}
export const SelfieEditPopUp = ({
  isVisible,
  isPopUpControlsVisible,
  currentPic,
}: SelfieEditProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(NoProfilePicture);

  useEffect(() => {
    if (currentPic instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          return setSelectedImage(reader.result as string);
        }
      };
      reader.readAsDataURL(currentPic);
    }
    if (typeof currentPic === "string") {
      return setSelectedImage(currentPic);
    }
    setSelectedImage(NoProfilePicture);
  }, [currentPic]);
  return (
    <div className="selfie-edit">
      <div className="container">
        <div className="selfie-edit__inner">
          <div className="selfie-edit__content">
            <span
              className="selfie-edit__x-mark"
              onClick={() => {
                isVisible(false);
              }}
            ></span>
            <h6 className="selfie-edit__title">Take selfie</h6>
            <p className="selfie-edit__tip-text">Drag and zoom image to crop</p>
            <div className="selfie-edit__selected-image-container">
              <img
                src={selectedImage}
                className="selfie-edit__selected-image"
                alt="selected photo"
              />
            </div>
            <div className="selfie-edit__buttons-container">
              <button
                className="selfie-edit__retake-button selfie-edit__button"
                onClick={() => {
                  isPopUpControlsVisible(true);
                  isVisible(false);
                }}
              >
                Retake
              </button>
              <button className="selfie-edit__save-button selfie-edit__button">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
