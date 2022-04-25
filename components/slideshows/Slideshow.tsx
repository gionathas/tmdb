import React, { useEffect, useRef, useState } from "react";
import { useScroll } from "react-use";
import ArrowButton, {
  variant as ArrowVariant,
} from "../miscellaneous/buttons/ArrowButton";

type Props = {
  title?: React.ReactElement;
  className?: string;
  children: React.ReactNode;
  scrollOffset: number;
  arrowVariant: ArrowVariant;
};

const Slideshow = ({
  title,
  children,
  className = "",
  scrollOffset,
  arrowVariant,
}: Props) => {
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const { x: sliderPosition } = useScroll(slideContainerRef);
  const [showArrows, setShowArrows] = useState(false);
  const [isScrollable, setIsScrollable] = useState({
    left: false,
    right: false,
  });

  // each time the sliderPosition changes, calculate if the slideshow is scrollable (left and right) with the arrows
  useEffect(() => {
    const isScrollableRight =
      (slideContainerRef.current &&
        slideContainerRef.current.scrollWidth -
          slideContainerRef.current.clientWidth >
          sliderPosition) ||
      false;
    const isScrollableLeft =
      (slideContainerRef.current && sliderPosition != 0) || false;
    setIsScrollable({ left: isScrollableLeft, right: isScrollableRight });
  }, [sliderPosition]);

  // reset the scroll position to 0 each time the component get updated
  useEffect(() => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollLeft = 0;
    }
  }, [children]);

  const scrollToRight = () => {
    if (slideContainerRef.current) {
      const currentScroll = slideContainerRef.current.scrollLeft;
      slideContainerRef.current.scrollTo({
        left: currentScroll + scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const scrollToLeft = () => {
    if (slideContainerRef.current) {
      const currentScroll = slideContainerRef.current.scrollLeft;
      slideContainerRef.current.scrollTo({
        left: currentScroll - scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const arrowBaseStyle =
    "fill-white absolute transition-all opacity-80 hover:opacity-100 bg-gray-500/30 hover:bg-gray-500/60 duration-200 rounded-lg z-10 top-1/4";
  const showArrow = "visible hover:cursor-pointer";
  const hideArrow = "invisible hover:cursor-default";

  const getArrowVisibility = (dir: "left" | "right") => {
    return isScrollable[dir] && showArrows ? showArrow : hideArrow;
  };

  return (
    <div className={className}>
      {title}
      <div
        className="relative"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {/* Left Scroll Arrow */}
        <ArrowButton
          className={`-left-4 ${arrowBaseStyle} ${getArrowVisibility("left")}`}
          direction="left"
          onClick={scrollToLeft}
          variant={arrowVariant}
        />
        {/* Slider Container */}
        <div
          ref={slideContainerRef}
          className={`relative flex overflow-auto scroll-smooth snap-x space-x-3.5 hide-scrollbar mt-4`}
        >
          {children}
        </div>
        {/* Right Scroll Arrow */}
        <ArrowButton
          className={`-right-4 ${arrowBaseStyle} ${getArrowVisibility(
            "right"
          )}`}
          direction="right"
          onClick={scrollToRight}
          variant={arrowVariant}
        />
      </div>
    </div>
  );
};

export default Slideshow;
