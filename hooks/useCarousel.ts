import useInterval from "hooks/useInterval";
import { useCallback, useState } from "react";

/**
 * Cycle through a list of items every n seconds.
 */
const useCarousel = (items: Array<any>, interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = useCallback(
    () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= items.length ? 0 : prevIndex + 1
      );
      resetInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items.length]
  );

  const prevItem = useCallback(
    () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? items.length - 1 : prevIndex - 1
      );
      resetInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items.length]
  );

  const { resetInterval } = useInterval(nextItem, interval);

  return { nextItem, prevItem, resetInterval, currentIndex };
};

export default useCarousel;
