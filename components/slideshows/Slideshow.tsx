import classNames from "classnames";
import useSlideshow from "hooks/useSlideshow";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  className,
  scrollOffset,
  arrowVariant,
}: Props) => {
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const { isScrollable, resetScroll, scrollToLeft, scrollToRight } =
    useSlideshow(slideContainerRef, scrollOffset);

  // reset the scroll position to 0, each time the component get updated
  useEffect(
    () => resetScroll(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children]
  );

  const generateArrowBtnClassName = (dir: "left" | "right") =>
    classNames(
      "fill-white absolute transition-all opacity-80 hover:opacity-100 bg-gray-500/30 hover:bg-gray-500/60 duration-200 rounded-lg z-10 top-1/4",
      {
        "-left-4": dir === "left",
        "-right-4": dir === "right",
        "visible hover:cursor-pointer": isScrollable[dir] && showArrows,
        "invisible hover:cursor-default": !isScrollable[dir] || !showArrows,
      }
    );

  /*
   Generate the classname for the left and right arrow. Since this component is higly re-rendered due to the useEffect hook that trigger a re-render 
   each time the slider position change, the left and right classnames are wrapped inside a useMemo hook.
   */
  const leftArrowBtnClassName = useMemo(
    () => generateArrowBtnClassName("left"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isScrollable.left, showArrows]
  );

  const rightArrowBtnClassName = useMemo(
    () => generateArrowBtnClassName("right"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isScrollable.right, showArrows]
  );

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
          className={leftArrowBtnClassName}
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
          className={rightArrowBtnClassName}
          direction="right"
          onClick={scrollToRight}
          variant={arrowVariant}
        />
      </div>
    </div>
  );
};

export default Slideshow;
