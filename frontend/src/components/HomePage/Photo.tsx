import { PhotoResponse } from "../../../../backend/src/models/photo";

interface PhotoProps {
  photo: PhotoResponse;
  setPhoto: React.Dispatch<React.SetStateAction<PhotoResponse | null>>;
  setPopUpPhotoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Photo = ({
  photo,
  setPhoto,
  setPopUpPhotoVisible,
}: PhotoProps) => {
  const { fullPhotoAccessLink, isActivated } = photo;
  return (
    <div
      className="photo"
      onClick={() => {
        console.log(isActivated);
        setPopUpPhotoVisible(true);
        setPhoto(photo);
      }}
    >
      <img className="photo-img" src={fullPhotoAccessLink} />
    </div>
  );
};
