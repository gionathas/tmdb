import classNames from "classnames";
import Properties from "config/properties";
import useSlideshow from "hooks/useSlideshow";
import React, { useCallback, useMemo, useState } from "react";
import ArrowButton, { ArrowVariant } from "../buttons/ArrowButton";

const {
  DEFAULT_MOVIE_SLIDESHOW_SCROLL_X_OFFSET: movieSlideshowDefaultScrollXOffset,
} = Properties;

type OwnProps = {
  title?: React.ReactNode;
  scrollOffset: number;
  arrowVariant?: ArrowVariant;
  children: React.ReactNode;
};

type SlideShowProps = OwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof OwnProps>;

const Slideshow = ({
  title,
  className,
  children,
  scrollOffset = movieSlideshowDefaultScrollXOffset,
  arrowVariant = "base",
}: SlideShowProps) => {
  const [showArrows, setShowArrows] = useState(false);
  const { isScrollable, scrollToLeft, scrollToRight, setRef } =
    useSlideshow(scrollOffset);

  const generateArrowBtnClassName = useCallback(
    (dir: "left" | "right") =>
      classNames(
        "fill-white absolute transition-all opacity-80 hover:opacity-100 bg-gray-500/30 hover:bg-gray-500/60 duration-200 rounded-lg z-10 top-1/4",
        {
          "-left-4": dir === "left",
          "-right-4": dir === "right",
          "visible hover:cursor-pointer": isScrollable[dir] && showArrows,
          "invisible hover:cursor-default": !isScrollable[dir] || !showArrows,
        }
      ),
    [isScrollable, showArrows]
  );

  /*
   Generate the classname for the left and right arrow. Since this component is higly re-rendered due to the useEffect hook that trigger a re-render 
   each time the slider position change, the left and right classnames are wrapped inside a useMemo hook.
   */
  const leftArrowBtnClassName = useMemo(
    () => generateArrowBtnClassName("left"),
    [generateArrowBtnClassName]
  );

  const rightArrowBtnClassName = useMemo(
    () => generateArrowBtnClassName("right"),
    [generateArrowBtnClassName]
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
          ref={setRef}
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
