import { useEffect } from "react";
import { PhotoButtonsGroup } from "./PhotoButtonsGroup";
import { PhotoResponse } from "../../../../backend/src/models/photo";

interface PopUpPhotoProps {
  photo: PhotoResponse;
  setPopUpPhotoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PopUpPhoto = ({
  photo,
  setPopUpPhotoVisible,
}: PopUpPhotoProps) => {
  const { fullPhotoAccessLink, isActivated } = photo;
  useEffect(() => {
    const closePopUpOnClickOutside = (event: MouseEvent) => {
      const popUpContainer = document.querySelector(".pop-up-photo-container__image");
      if (popUpContainer && popUpContainer === event.target) {
        setPopUpPhotoVisible(false);
      }
    };
    document.addEventListener("click", closePopUpOnClickOutside);
    return () => {
      document.removeEventListener("click", closePopUpOnClickOutside);
    };
  }, [setPopUpPhotoVisible]);
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return (
    <div className="pop-up-photo-container">
      <span
        className="pop-up-photo-container__close"
        onClick={() => setPopUpPhotoVisible(false)}
      ></span>
      <div className="container">
        <div className="pop-up-photo-container__image">
          <img
            className="pop-up-photo-container__photo"
            src={fullPhotoAccessLink}
            alt="full photo"
          />
        </div>
      </div>
      {isActivated ? (
        <div className="pop-up-photo-container__buttons">
          <PhotoButtonsGroup />
        </div>
      ) : (
        <div className="pop-up-photo-container__button">
          <button className="pop-up-photo-container__unlock">
            Unlock photos
          </button>
        </div>
      )}
    </div>
  );
};
