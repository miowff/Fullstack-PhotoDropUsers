import { useNavigate } from "react-router-dom";
import { AlbumModel } from "../../../../backend/src/models/albums";

interface AlbumProps {
  album: AlbumModel;
}
export const Album = ({ album }: AlbumProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="album"
      onClick={() => {
        navigate(`/album/${album.albumId}`);
      }}
    >
      <div className="album-content">
        <img className="album-background-image" src={album.previewPhotoLink} />
      </div>
      <h6 className="album-title">{album.title}</h6>
    </div>
  );
};
