import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cycle through a list of items every n seconds.
 */
const useCarousel = (items: Array<any>, interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextItem = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= items.length ? 0 : prevIndex + 1
    );
  }, [items.length]);

  const prevItem = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? items.length - 1 : prevIndex - 1
    );
  }, [items.length]);

  // clear previous interval and setup a new one
  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(nextItem, interval);
  }, [nextItem, interval]);

  // setup carousel interval
  useEffect(() => {
    const intervalId = setInterval(nextItem, interval);
    intervalRef.current = intervalId;
    return () => clearInterval(intervalId);
  }, [nextItem, interval]);

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
