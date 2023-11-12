import { useEffect, useState } from "react";
import NoProfilePicture from "../../public/images/NoProfilePicture.svg";
import { useLazyGetUploadProfilePicUrlQuery } from "../../api/user";
import { isErrorWithMessage } from "../../utils/errorParser";
import { ErrorPopUp } from "../ErrorPopUp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/user/authSlice";
import { useNavigate } from "react-router-dom";
interface SelfieEditProps {
  isVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isPopUpControlsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentPic: string | File | null;
}
export const SelfieEditPopUp = ({
  isVisible,
  isPopUpControlsVisible,
  currentPic,
}: SelfieEditProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string>(NoProfilePicture);
  const [error, setError] = useState("");
  const [getUploadProfilePicUrl] = useLazyGetUploadProfilePicUrlQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  const uploadProfilePic = async () => {
    try {
      if (currentPic && typeof currentPic !== "string") {
        const { name: fileName, type } = currentPic;
        const { url: preSignedUrl, accessUrl } = await getUploadProfilePicUrl({
          fileName,
          type,
        }).unwrap();
        const { url, fields } = preSignedUrl;
        const formData = new FormData();
        for (const [key, value] of Object.entries(fields)) {
          formData.append(key, value);
        }
        formData.append("file", currentPic);
        await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (user) {
          const updatedUser = {
            ...user,
            profilePhotoLink: accessUrl,
          };
          dispatch(setUser(updatedUser));
        }
      }
      navigate("/");
    } catch (err) {
      const error = isErrorWithMessage(err);
      if (error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  };
  useEffect(() => {
    if (currentPic instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          return setSelectedImage(reader.result as string);
        }
      };
      reader.readAsDataURL(currentPic);
    }

    setSelectedImage(NoProfilePicture);
  }, [currentPic]);

  return (
    <div className="selfie-edit">
      <div className="container">
        <ErrorPopUp message={error}></ErrorPopUp>
        <div className="selfie-edit__inner">
          <div className="selfie-edit__content">
            <span
              className="selfie-edit__x-mark"
              onClick={() => {
                isVisible(false);
              }}
            ></span>
            <h6 className="selfie-edit__title">Take selfie</h6>
            <p className="selfie-edit__tip-text">Drag and zoom image to crop</p>
            <div className="selfie-edit__selected-image-container">
              <img
                src={selectedImage}
                className="selfie-edit__selected-image"
                alt="selected photo"
              />
            </div>
            <div className="selfie-edit__buttons-container">
              <button
                className="selfie-edit__retake-button selfie-edit__button"
                onClick={() => {
                  isPopUpControlsVisible(true);
                  isVisible(false);
                }}
              >
                Retake
              </button>
              <button
                className="selfie-edit__save-button selfie-edit__button"
                onClick={async () => {
                  await uploadProfilePic();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
