import { RefObject, useEffect } from "react";
export const useHandleOutsideClick = <T extends HTMLElement>(
  element: RefObject<T>,
  callback: () => void,
  exceptions?: RefObject<T>[]
) => {
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (element.current && !element.current.contains(event.target as Node)) {
        let isException = false;
        if (exceptions) {
          isException = exceptions.some((element) => {
            if (element.current) {
              if (element.current.contains(event.target as Node)) return true;
            }
          });
        }
        if (!isException) {
          callback();
        } else {
          event.preventDefault();
        }
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [callback, element, exceptions]);
};
