import DownloadIcon from "../../public/images/DownloadIcon.svg";
import ShareIcon from "../../public/images/ShareIcon.svg";
export function PhotoButtonsGroup() {
  return (
    <div className="photo-buttons-group">
      <span className="photo-buttons-group__buttons-download">
        <img
          className="photo-buttons-group__buttons-icon"
          src={DownloadIcon}
          alt="download icon"
        />
        <p>Download</p>
      </span>
      <span className="photo-buttons-group__share">
        <img
          className="photo-buttons-group__buttons-icon"
          src={ShareIcon}
          alt="share icon"
        ></img>
        <p>Share</p>
      </span>
      <button className="photo-buttons-group__see-in-frame">
        See in a frame
      </button>
    </div>
  );
}
