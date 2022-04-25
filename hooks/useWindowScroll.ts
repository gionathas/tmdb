import { isUndefined } from "lodash";
import { useEffect, useState } from "react";

const useWindowScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (!isUndefined(window)) {
      const updatePosition = () => {
        setScrollPosition(window.pageYOffset);
      };
      window.addEventListener("scroll", updatePosition);
      updatePosition();
      return () => window.removeEventListener("scroll", updatePosition);
    }
  }, []);

  return scrollPosition;
};

export default useWindowScroll;
