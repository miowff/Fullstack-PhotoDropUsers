import { useEffect, useState } from "react";
import { Album } from "./Album";
import { Photo } from "./Photo";
import { AlbumModel } from "../../../../backend/src/models/albums";
import { useLazyGetAllUserPhotosQuery } from "../../api/photos";
import { PhotoResponse } from "../../../../backend/src/models/photo";
import { PopUpPhoto } from "./PopUpPhoto";

interface UserContentProps {
  albums: AlbumModel[];
}

export const UserContent = ({ albums }: UserContentProps) => {
  const [photo, setPhoto] = useState<string>("");
  const [isPopUpPhotoVisible, setPopUpPhotoVisible] = useState<boolean>(false);
  const [getPhotos] = useLazyGetAllUserPhotosQuery();
  const [photos, setPhotos] = useState<PhotoResponse[]>([]);
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>): void => {
    const container = event.currentTarget;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const albums = document.querySelectorAll(".album");
      albums.forEach((album) => {
        if (album.contains(event.target as Node)) {
          event.preventDefault();
        }
      });
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);
  useEffect(() => {
    getPhotos()
      .unwrap()
      .then((photos) => {
        setPhotos(photos);
      });
  }, []);
  return (
    <section className="user-content">
      {isPopUpPhotoVisible && (
        <PopUpPhoto
          photoUrl={photo}
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
        <div className="user-content__photos-container">
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
      </div>
    </section>
  );
};
