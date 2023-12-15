import { PhotoResponse } from "../../../../../backend/src/models/photo";
import { Photo } from "../Photo/Photo";

interface PhotosGroupProps {
  photos: PhotoResponse[];
  setPhoto: React.Dispatch<React.SetStateAction<PhotoResponse | null>>;
  setPopUpPhotoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PhotosGroup = ({
  photos,
  setPhoto,
  setPopUpPhotoVisible,
}: PhotosGroupProps) => {
  return (
    <div className="photos-container">
      {photos.map((photo, index) => {
        return (
          <Photo
            setPopUpPhotoVisible={setPopUpPhotoVisible}
            setPhoto={setPhoto}
            photo={photo}
            key={index}
          />
        );
      })}
    </div>
  );
};
