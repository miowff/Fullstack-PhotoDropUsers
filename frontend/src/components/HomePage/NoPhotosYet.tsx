import NewSms from "../../public/images/NewSms.svg";
import ChaseBaker from "../../public/images/ArtistsPrints/ChaseBaker.jpg";
import JorgeGardner from "../../public/images/ArtistsPrints/JorgeGardner.jpg";
import { useState } from "react";
import { PopUpPhoto } from "./PopUpPhoto";
import { PhotoResponse } from "../../../../backend/src/models/photo";

export const NoPhotosYet = () => {
  const [photo, setPhoto] = useState<PhotoResponse | null>(null);
  const [isPopUpPhotoVisible, setPopUpPhotoVisible] = useState<boolean>(false);
  return (
    <section className="no-photos-yet">
      {isPopUpPhotoVisible && (
        <PopUpPhoto
          photo={photo as PhotoResponse}
          setPopUpPhotoVisible={setPopUpPhotoVisible}
        />
      )}
      <div className="no-photos-yet__content">
        <div className="container">
          <div className="no-photos-yet__info">
            <img
              className="no-photos-yet__info-image"
              src={NewSms}
              alt="new sms icon"
            />
            <h6 className="no-photos-yet__info-title">
              Your photos will drop soon.
            </h6>
            <p className="no-photos-yet__info-text">
              You will get a text message when they are ready. It can take up to
              48 hours.
            </p>
          </div>
          <div className="no-photos-yet__artists-prints">
            <h4 className="no-photos-yet__artists-prints-title">
              Browse Art Prints
            </h4>
            <div className="no-photos-yet__artists-prints-thumbnails">
              <div
                className="no-photos-yet__artists-prints-thumbnail"
                onClick={() => {
                  setPhoto({
                    isActivated: true,
                    fullPhotoAccessLink: ChaseBaker,
                    thumbnailAccessLink: ChaseBaker,
                  });
                  setPopUpPhotoVisible(true);
                }}
              >
                <img
                  className="no-photos-yet__artists-prints-image"
                  src={ChaseBaker}
                  alt="artists image"
                />
              </div>

              <div
                className="no-photos-yet__artists-prints-thumbnail"
                onClick={() => {
                  setPhoto({
                    isActivated: true,
                    fullPhotoAccessLink: JorgeGardner,
                    thumbnailAccessLink: JorgeGardner,
                  });
                  setPopUpPhotoVisible(true);
                }}
              >
                <img
                  className="no-photos-yet__artists-prints-image"
                  src={JorgeGardner}
                  alt="artists image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
