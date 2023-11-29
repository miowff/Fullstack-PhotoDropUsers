import { useEffect } from "react";
export const usePreventVerticalScroll = (className: string) => {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const albums = document.querySelectorAll(className);
      albums.forEach((album) => {
        if (album.contains(event.target as Node)) {
          event.preventDefault();
        }
      });
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [className]);
};
