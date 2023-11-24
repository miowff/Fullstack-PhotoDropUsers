import { useEffect, useRef, useState } from "react";
import { ErrorPopUp } from "../ErrorPopUp";
import NoProfilePicture from "../../public/images/NoProfilePicture.svg";
import { MobileUploadOptions } from "./MobileUploadOptions";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLazyGetUploadProfilePicUrlQuery } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/user/authSlice";
import { isErrorWithMessage } from "../../utils/errorParser";
import { useHandleOutsideClick } from "../../hooks/useHandleOutsideClick";
interface SelfieEditProps {
  currentPic: string | File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | File | null>>;
  setSelfieEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SelfieEditPopUp = ({
  currentPic,
  setSelectedFile,
  setSelfieEditVisible,
  setUploadOptionsVisible,
}: SelfieEditProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [getUploadProfilePicUrl] = useLazyGetUploadProfilePicUrlQuery();
  const { pathname } = useLocation();
  const [selectedImage, setSelectedImage] = useState<string>(
    currentPic as string
  );
  const retakeButtonRef = useRef<HTMLButtonElement>(null);
  const selfieEditAreaRef = useRef<HTMLDivElement>(null);
  const [isMobileOptionsVisible, setMobileOptionsVisible] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSelfieUploading, setIsSelfieUploading] = useState<boolean>(false);
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
    if (typeof currentPic === "string") {
      return setSelectedImage(currentPic);
    }
    setSelectedImage(NoProfilePicture);
  }, [currentPic]);
  useHandleOutsideClick(selfieEditAreaRef, () => {
    setSelfieEditVisible(false);
    if (!isMobile) {
      setUploadOptionsVisible(true);
    }
  });
  const uploadProfilePic = async () => {
    try {
      setIsSelfieUploading(true);
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
      setIsSelfieUploading(false);
      if (pathname !== "/me") {
        return navigate("/");
      }
    } catch (err) {
      const error = isErrorWithMessage(err);
      if (error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  };
  const handleRetakeClick = () => {
    if (isMobile) {
      if (isMobileOptionsVisible) {
        setMobileOptionsVisible(false);
      } else {
        setMobileOptionsVisible(true);
      }
    } else {
      setSelfieEditVisible(false);
      setUploadOptionsVisible(true);
    }
  };
  return (
    <div className="selfie-edit">
      <div className="container">
        <ErrorPopUp message={error}></ErrorPopUp>
        <div className="selfie-edit__inner" ref={selfieEditAreaRef}>
          <div className="selfie-edit__content">
            <span
              className="selfie-edit__x-mark"
              onClick={() => {
                setSelfieEditVisible(false);
              }}
            ></span>
            <h6 className="selfie-edit__title">Take selfie</h6>
            <div className="selfie-edit__middle-content">
              <p className="selfie-edit__tip-text">
                Drag and zoom image to crop
              </p>
              <div className="selfie-edit__selected-image-container">
                <img
                  className="selfie-edit__selected-image"
                  alt="selected photo"
                  src={selectedImage}
                />
              </div>
              <div className="selfie-edit__buttons-container">
                {isMobile && (
                  <>
                    {isMobileOptionsVisible && (
                      <div className="selfie-edit__mobile-options">
                        <MobileUploadOptions
                          setSelfieEditVisible={setSelfieEditVisible}
                          setSelectedFile={setSelectedFile}
                          isVisible={setMobileOptionsVisible}
                          controlButton={retakeButtonRef}
                        />
                      </div>
                    )}
                  </>
                )}
                {!isSelfieUploading ? (
                  <>
                    <button
                      className="selfie-edit__retake-button selfie-edit__button"
                      onClick={handleRetakeClick}
                      ref={retakeButtonRef}
                    >
                      Retake
                    </button>
                    <button
                      className="selfie-edit__save-button selfie-edit__button"
                      onClick={async () => {
                        await uploadProfilePic();
                        setSelfieEditVisible(false);
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div className="loading">
                    <p className="default-text">Loading</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
