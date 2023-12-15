import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { useGetAlbumInfoQuery } from "../../api/albums";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching, isLoading } = useGetAlbumInfoQuery(id as string);
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewBase64, setPreviewBase64] = useState<string>("");
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      const { title, previewPhotoLink, previewBase64 } = data;
      setPreviewBase64(previewBase64);
      setAlbumTitle(title);
      setPreviewUrl(previewPhotoLink);
    }
  }, [data]);
  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          <Header />
          <section className="success">
            <div className="container">
              <div className="success__inner">
                <h1 className="success__title">Thank you!</h1>
                <p className="success__info-text success__main-text">
                  The album
                  <span className="success__bold-text"> {albumTitle} </span>
                  is now unlocked.
                </p>
                <p className="success__description-text success__main-text">
                  You can now download, share, post, and print your hi-res,
                  watermark-free, glorious memories.
                </p>
                <img
                  className="success__album-preview-image"
                  onLoad={() => {
                    setIsImageLoaded(true);
                  }}
                  src={isImageLoaded ? previewUrl : previewBase64}
                />
                <button
                  className="success__see-photos"
                  onClick={() => {
                    navigate(`/album/${id}`);
                  }}
                >
                  See photos
                </button>
                <p className="success__under-button-text">
                  You will receive an email with your order details.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
