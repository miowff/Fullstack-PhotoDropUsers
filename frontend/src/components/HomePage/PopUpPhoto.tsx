import { useEffect } from "react";
import { PhotoButtonsGroup } from "./PhotoButtonsGroup";

interface PopUpPhotoProps {
  photoUrl: string;
  setPopUpPhotoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PopUpPhoto = ({
  photoUrl,
  setPopUpPhotoVisible,
}: PopUpPhotoProps) => {
  useEffect(() => {
    const closePopUpOnClickOutside = (event: MouseEvent) => {
      const popUpContainer = document.querySelector(".pop-up-photo-container");
      if (popUpContainer && popUpContainer === event.target) {
        setPopUpPhotoVisible(false);
      }
    };

    document.addEventListener("click", closePopUpOnClickOutside);

    return () => {
      document.removeEventListener("click", closePopUpOnClickOutside);
    };
  }, [setPopUpPhotoVisible]);
  return (
    <div className="pop-up-photo-container">
      <span
        className="pop-up-photo-container__close"
        onClick={() => setPopUpPhotoVisible(false)}
      ></span>
      <div className="container">
        <img
          className="pop-up-photo-container__photo"
          src={photoUrl}
          alt="full photo"
        />
      </div>
      <div className="pop-up-photo-container__buttons">
        <PhotoButtonsGroup />
      </div>
    </div>
  );
};
