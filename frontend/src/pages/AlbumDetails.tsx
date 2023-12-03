import { useNavigate, useParams } from "react-router-dom";
import { useGetAlbumWithPhotosQuery } from "../api/albums";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";
import { PhotoResponse } from "../../../backend/src/models/photo";
import { PhotosGroup } from "../components/Photos/PhotosGroup";
import { PopUpPhoto } from "../components/HomePage/PopUpPhoto";
import { Footer } from "../components/Footer";

export const AlbumDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetAlbumWithPhotosQuery(
    id as string
  );
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<PhotoResponse[]>();
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [createdDate, setCreatedDate] = useState<string>("");
  const [photo, setPhoto] = useState<PhotoResponse | null>(null);
  const [isPopUpPhotoVisible, setPopUpPhotoVisible] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      const { photos, title, createdDate } = data;
      setPhotos(photos);
      setAlbumTitle(title);
      setCreatedDate(createdDate);
    }
  }, [data]);
  return (
    <>
      {isFetching || isLoading || !photos ? (
        <Loader />
      ) : (
        <>
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
                  <span
                    className="album-details__left-arrow"
                    onClick={() => {
                      navigate("/");
                    }}
                  ></span>
                  <div className="album-details__info">
                    <h1 className="albums-details__album-title">
                      {albumTitle}
                    </h1>
                    <div className="album-details__details">
                      <p className="album-details__date">{createdDate}</p>
                      <p className="album-details__photos-count">
                        {photos.length} photos
                      </p>
                    </div>
                  </div>
                  <p className="album-details__unlock-photos">
                    Unlock your photos
                  </p>
                </div>
              </div>
            </div>
            <div className="album-details__photos-section">
              <div className="album-details__images">
                <PhotosGroup
                  photos={photos}
                  setPhoto={setPhoto}
                  setPopUpPhotoVisible={setPopUpPhotoVisible}
                />
              </div>
              <div className="container">
                <div className="album-details__unlock-button">
                  <button className="default-button">Unlock your photos</button>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};