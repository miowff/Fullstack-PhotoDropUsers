import { useState } from "react";
import { PhotoResponse } from "../../../../../backend/src/models/photo";

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
  const { fullPhotoAccessLink, previewBase64 } = photo;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <div
      className="photo"
      onClick={() => {
        setPopUpPhotoVisible(true);
        setPhoto(photo);
      }}
    >
      <img
        className={"photo-img"}
        src={isLoaded ? fullPhotoAccessLink : previewBase64}
        loading="lazy"
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </div>
  );
};
