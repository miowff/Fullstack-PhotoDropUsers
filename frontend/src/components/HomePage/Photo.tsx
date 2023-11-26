import { PhotoResponse } from "../../../../backend/src/models/photo";

interface PhotoProps {
  photo: PhotoResponse;
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  setPopUpPhotoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Photo = ({
  photo,
  setPhoto,
  setPopUpPhotoVisible,
}: PhotoProps) => {
  const { fullPhotoAccessLink, thumbnailAccessLink } = photo;
  return (
    <div
      className="photo"
      onClick={() => {
        setPopUpPhotoVisible(true);
        setPhoto(fullPhotoAccessLink);
      }}
    >
      <img className="photo-img" src={thumbnailAccessLink} />
    </div>
  );
};
