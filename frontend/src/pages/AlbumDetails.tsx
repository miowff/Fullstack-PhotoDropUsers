import { useParams } from "react-router-dom";
import { useGetAlbumWithPhotosQuery } from "../api/albums";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";
import { PhotoResponse } from "../../../backend/src/models/photo";
import { PhotosGroup } from "../components/Photos/PhotosGroup";
import { PopUpPhoto } from "../components/HomePage/PopUpPhoto";

export const AlbumDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetAlbumWithPhotosQuery(
    id as string
  );
  const [photos, setPhotos] = useState<PhotoResponse[]>();
  const [photo, setPhoto] = useState<PhotoResponse | null>(null);
  const [isPopUpPhotoVisible, setPopUpPhotoVisible] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      const { photos } = data;
      setPhotos(photos);
    }
  }, [data]);
  return (
    <>
      {isFetching || isLoading || !photos ? (
        <Loader />
      ) : (
        <section className="album-details">
          {isPopUpPhotoVisible && (
            <PopUpPhoto
              photo={photo as PhotoResponse}
              setPopUpPhotoVisible={setPopUpPhotoVisible}
            />
          )}
          <div className="container">
            <div className="album-details__inner">
              <div className="album-details__header">
                <div className="album-details__info">
                  <h3 className="default-title">Brooklyn Bridge</h3>
                  <p className="album-details__date">date</p>
                </div>
                <p className="album-details__unlock-photos">
                  Unlock your photos
                </p>
              </div>
              <div className="album-details__images">
                <PhotosGroup
                  photos={photos}
                  setPhoto={setPhoto}
                  setPopUpPhotoVisible={setPopUpPhotoVisible}
                />
              </div>
              <div className="album-details__unlock-button">
                <button className="default-button">Unlock your photos</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
