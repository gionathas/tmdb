import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cycle through a list of items every n seconds.
 */
const useCarousel = (items: Array<any>, interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

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

  // setup carousel interval
  useEffect(() => {
    intervalRef.current = setInterval(nextItem, interval);
    return () => clearInterval(intervalRef.current!);
  }, [nextItem, interval]);

  // clear previous interval and setup a new one
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(nextItem, interval);
  };

  // clear the carousel interval before unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { nextItem, prevItem, resetInterval, currentIndex };
};

export default useCarousel;
