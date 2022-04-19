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
        slideContainerRef.current.clientWidth <=
        sliderPosition) ||
    false;

  const isScrollableLeft =
    (slideContainerRef && slideContainerRef.current && sliderPosition == 0) ||
    false;

  return (
    <div className={classname}>
      <div className="flex items-center ml-4">
        {title}
        <ScrollArrowButtons
          onLeftScroll={scrollToLeft}
          onRightScroll={scrollToRight}
          hideRightArrow={isScrollableRight}
          hideLeftArrow={isScrollableLeft}
        />
      </div>
      <div
        //@ts-ignore
        ref={slideContainerRef}
        className={`relative flex overflow-auto scroll-smooth snap-x space-x-3.5 hide-scrollbar py-4 px-4`}
      >
        {children}
      </div>
    </div>
  );
};

const ScrollArrowButtons = ({
  onLeftScroll: onLeftClick,
  onRightScroll: onRightClick,
  hideRightArrow = false,
  hideLeftArrow = false,
}: {
  onLeftScroll?: () => void;
  onRightScroll?: () => void;
  hideRightArrow?: boolean;
  hideLeftArrow?: boolean;
}) => {
  const styleClasses =
    "fill-gray-300 transition-colors duration-200 hover:bg-gray-600/40";
  return (
    <div className="flex space-x-1.5 ml-auto mr-2">
      <ArrowButton
        className={`${styleClasses}`}
        direction="left"
        onClick={onLeftClick}
        hide={hideLeftArrow}
      />
      <ArrowButton
        className={`${styleClasses}`}
        direction="right"
        onClick={onRightClick}
        hide={hideRightArrow}
      />
    </div>
  );
};

export default Slideshow;
