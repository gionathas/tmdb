import React, { useRef } from "react";
import { useScroll } from "react-use";
import ArrowButton from "../miscellaneous/buttons/ArrowButton";

type Props = {
  title?: React.ReactElement;
  classname?: string;
  children: React.ReactNode;
  scrollOffset: number;
};

const Slideshow = ({
  title,
  children,
  classname = "",
  scrollOffset,
}: Props) => {
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const { x: sliderPosition } = useScroll(slideContainerRef);

  const scrollToRight = () => {
    if (slideContainerRef && slideContainerRef.current) {
      slideContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  const scrollToLeft = () => {
    if (slideContainerRef && slideContainerRef.current) {
      slideContainerRef.current.scrollLeft -= scrollOffset;
    }
  };

  const isScrollableRight =
    (slideContainerRef &&
      slideContainerRef.current &&
      slideContainerRef.current.scrollWidth -
        slideContainerRef.current.clientWidth <
        sliderPosition) ||
    false;

  const isScrollableLeft =
    (slideContainerRef && slideContainerRef.current && sliderPosition == 0) ||
    false;

  const arrowStyle =
    "fill-white absolute z-10 transition-opacity opacity-80 hover:opacity-100";

  return (
    <div className={`${classname}`}>
      <div>{title}</div>
      <div className="relative">
        <ArrowButton
          className={`top-14 left-0 ${arrowStyle} ${
            !isScrollableLeft ? "visible" : "invisible"
          }`}
          direction="left"
          onClick={scrollToLeft}
          hide={isScrollableLeft}
          variant="lg"
        />
        <div
          //@ts-ignore
          ref={slideContainerRef}
          className={`relative flex overflow-auto scroll-smooth snap-x space-x-3.5 hide-scrollbar mt-4`}
        >
          {children}
        </div>
        <ArrowButton
          className={`top-14 right-0 ${arrowStyle} ${
            !isScrollableRight ? "visible" : "invisible"
          }`}
          direction="right"
          onClick={scrollToRight}
          hide={isScrollableRight}
          variant="lg"
        />
      </div>
    </div>
  );
};

export default Slideshow;
