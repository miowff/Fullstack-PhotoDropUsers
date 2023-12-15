import { useNavigate } from "react-router-dom";
import { AlbumModel } from "../../../../../backend/src/models/albums";
import { useState } from "react";

interface AlbumProps {
  album: AlbumModel;
}
export const Album = ({ album }: AlbumProps) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  return (
    <div
      className="album"
      onClick={() => {
        navigate(`/album/${album.albumId}`);
      }}
    >
      <div className="album-content">
        <img
          className="album-background-image"
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          src={isImageLoaded ? album.previewPhotoLink : album.previewBase64}
          loading="lazy"
        />
      </div>
      <h6 className="album-title">{album.title}</h6>
    </div>
  );
};
