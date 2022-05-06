import { useCallback, useRef, useState } from "react";

const useSlideshow = (scrollOffset: number) => {
  const [isScrollable, setIsScrollable] = useState({
    left: false,
    right: false,
  });

  const sliderContainerRef = useRef<HTMLElement | null>(null);

  // calculate if the slider container is scrollable left and riht
  const calculateIsScrollable = useCallback((el: HTMLElement) => {
    if (el) {
      const isScrollableRight = el.scrollLeft + el.clientWidth < el.scrollWidth;
      const isScrollableLeft = el.scrollLeft > 0;
      setIsScrollable({ left: isScrollableLeft, right: isScrollableRight });
    }
  }, []);

  // event listener attached to the slider container
  const scrollListener = useCallback(
    (ev: Event) => {
      return calculateIsScrollable(ev.target as HTMLElement);
    },
    [calculateIsScrollable]
  );

  // callback used to set the reference to the slider container
  const setRef = useCallback(
    (node: HTMLElement | null) => {
      //unmount
      if (sliderContainerRef.current) {
        sliderContainerRef.current.removeEventListener(
          "scroll",
          scrollListener
        );
      }

      sliderContainerRef.current = node;

      //mount
      if (sliderContainerRef.current) {
        calculateIsScrollable(sliderContainerRef.current);
        sliderContainerRef.current.addEventListener("scroll", scrollListener, {
          passive: true,
        });
      }
    },
    [scrollListener, calculateIsScrollable]
  );

  const scrollToRight = useCallback(() => {
    if (sliderContainerRef.current) {
      const currentScroll = sliderContainerRef.current.scrollLeft;
      sliderContainerRef.current.scrollTo({
        left: currentScroll + scrollOffset,
        behavior: "smooth",
      });
    }
  }, [scrollOffset]);

  const scrollToLeft = useCallback(() => {
    if (sliderContainerRef.current) {
      const currentScroll = sliderContainerRef.current.scrollLeft;
      sliderContainerRef.current.scrollTo({
        left: currentScroll - scrollOffset,
        behavior: "smooth",
      });
    }
  }, [scrollOffset]);

  return {
    scrollToLeft,
    scrollToRight,
    isScrollable,
    setRef,
  };
};

export default useSlideshow;
