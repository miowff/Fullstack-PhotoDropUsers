import { AlbumModel } from "../../../../backend/src/models/albums";

interface AlbumProps {
  album: AlbumModel;
}
export const Album = ({ album }: AlbumProps) => {
  
  return (
    <div className="album">
      <div className="album-content">
        <img className="album-background-image" src={album.previewPhotoLink} />
      </div>
      <p className="album-title">{album.title}</p>
    </div>
  );
};
