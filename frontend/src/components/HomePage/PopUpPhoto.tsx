import { PhotoButtonsGroup } from "./PhotoButtonsGroup";

interface PopUpPhotoProps {
  photoUrl: string;
  setPopUpPhotoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PopUpPhoto = ({
  photoUrl,
  setPopUpPhotoVisible,
}: PopUpPhotoProps) => {
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
