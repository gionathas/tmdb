import React, { useEffect, useState } from "react";
import { useScroll } from "react-use";

const useSlideshow = (
  slideshowContainerRef: React.RefObject<HTMLDivElement>,
  scrollOffset: number
) => {
  const { x: sliderPosition } = useScroll(slideshowContainerRef);
  const [isScrollable, setIsScrollable] = useState({
    left: false,
    right: false,
  });

  // each time the sliderPosition changes, calculate if the slideshow is scrollable (left and right) with the arrows
  useEffect(() => {
    const sliderContainer = slideshowContainerRef.current;
    const isScrollableRight =
      (sliderContainer &&
        sliderContainer.scrollWidth - sliderContainer.clientWidth >
          sliderPosition) ||
      false;
    const isScrollableLeft = (sliderContainer && sliderPosition != 0) || false;
    setIsScrollable({ left: isScrollableLeft, right: isScrollableRight });
  }, [sliderPosition]);

  const scrollToRight = () => {
    if (slideshowContainerRef.current) {
      const currentScroll = slideshowContainerRef.current.scrollLeft;
      slideshowContainerRef.current.scrollTo({
        left: currentScroll + scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const scrollToLeft = () => {
    if (slideshowContainerRef.current) {
      const currentScroll = slideshowContainerRef.current.scrollLeft;
      slideshowContainerRef.current.scrollTo({
        left: currentScroll - scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const resetScroll = () => {
    if (slideshowContainerRef.current) {
      slideshowContainerRef.current.scrollLeft = 0;
    }
  };

  return {
    scrollToLeft,
    scrollToRight,
    resetScroll,
    isScrollable,
  };
};

export default useSlideshow;
