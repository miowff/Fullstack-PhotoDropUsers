import { isMobile } from "react-device-detect";
import DownloadIcon from "../../../public/images/DownloadIcon.svg";
import ShareIcon from "../../../public/images/ShareIcon.svg";
import { AlertData } from "../../Alert";
interface PhotoButtonsProps {
  downloadPhotoUrl: string;
  photoName: string;
  setAlert: React.Dispatch<React.SetStateAction<AlertData | null>>;
}
export const PhotoButtonsGroup = ({
  downloadPhotoUrl,
  photoName,
  setAlert,
}: PhotoButtonsProps) => {
  const handleDownload = async () => {
    try {
      const link = document.createElement("a");
      link.href = downloadPhotoUrl;
      link.download = photoName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      setAlert({ message: "Error on photo downloading!", isError: true });
    }
  };
  const shareContent = async () => {
    try {
      await navigator.share({
        title: photoName,
        url: downloadPhotoUrl,
      });
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };
  return (
    <div className="photo-buttons-group">
      <span
        className="photo-buttons-group__buttons-download"
        onClick={handleDownload}
      >
        <img
          className="photo-buttons-group__buttons-icon"
          src={DownloadIcon}
          alt="download icon"
        />
        <p>Download</p>
      </span>
      {isMobile && (
        <span className="photo-buttons-group__share" onClick={shareContent}>
          <img
            className="photo-buttons-group__buttons-icon"
            src={ShareIcon}
            alt="share icon"
          ></img>
          <p>Share</p>
        </span>
      )}
    </div>
  );
};
