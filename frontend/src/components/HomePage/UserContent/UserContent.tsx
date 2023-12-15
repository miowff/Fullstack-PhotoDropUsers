import { useState } from "react";
import { Album } from "../Album/Album";
import { AlbumModel } from "../../../../../backend/src/models/albums";
import { PhotoResponse } from "../../../../../backend/src/models/photo";
import { PopUpPhoto } from "../../Photos/PopUpPhoto/PopUpPhoto";
import { usePreventVerticalScroll } from "../../../hooks/useHorizontalScroll";
import { handleScroll } from "../../../hooks/useHandleHorizontalScroll";
import { PhotosGroup } from "../../Photos/PhotosGroup/PhotosGroup";

interface UserContentProps {
  albums: AlbumModel[];
  photos: PhotoResponse[];
}

export const UserContent = ({ albums, photos }: UserContentProps) => {
  const [photo, setPhoto] = useState<PhotoResponse | null>(null);
  const [isPopUpPhotoVisible, setPopUpPhotoVisible] = useState<boolean>(false);
  usePreventVerticalScroll(".album");
  return (
    <section className="user-content">
      {isPopUpPhotoVisible && (
        <PopUpPhoto
          photo={photo as PhotoResponse}
          setPopUpPhotoVisible={setPopUpPhotoVisible}
        />
      )}
      <div className="container">
        <div className="user-content__inner">
          <div className="user-content__albums">
            <p className="default-bold-text">Albums</p>
            <div
              className="user-content__albums-container"
              onWheel={(event) => handleScroll(event)}
            >
              {albums.map((album, index) => {
                return <Album album={album} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="user-content__photos">
        <div className="container">
          <p className="default-bold-text">All photos</p>
        </div>
        <div>
          <PhotosGroup
            photos={photos}
            setPopUpPhotoVisible={setPopUpPhotoVisible}
            setPhoto={setPhoto}
          />
        </div>
      </div>
    </section>
  );
};
