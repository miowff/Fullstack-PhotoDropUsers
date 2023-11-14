import { useEffect } from "react";
import { Album } from "./Album";
import { Photo } from "./Photo";

export const UserContent = () => {
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>): void => {
    const container = event.currentTarget;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const albumsContainer = document.querySelector(
        ".user-content__albums-container"
      );

      if (albumsContainer?.contains(event.target as Node)) {
        event.preventDefault();
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return (
    <section className="user-content">
      <div className="container">
        <div className="user-content__inner">
          <div className="user-content__albums">
            <p className="default-bold-text">Albums</p>
            <div
              className="user-content__albums-container"
              onWheel={(event) => handleScroll(event)}
            >
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
              <Album />
            </div>
          </div>
          <div className="user-content__photos">
            <p className="default-bold-text">All photos</p>
            <div className="user-content__photos-container">
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
              <Photo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
