import classNames from "classnames";
import React from "react";

type directions = "left" | "right";
const leftArrowSvgPath = (
  <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
);
const rightArrowSvgPath = (
  <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
);

type variant = "sm" | "base" | "lg" | "xl";

const ArrowButton = ({
  direction,
  onClick: handleClick,
  hide = false,
  className,
  variant = "base",
}: {
  direction: directions;
  onClick?: () => void;
  hide?: boolean;
  className?: string;
  variant?: variant;
}) => {
  const icon = direction === "left" ? leftArrowSvgPath : rightArrowSvgPath;
  const hideClass = (hide && "opacity-0 cursor-default") || "cursor-pointer";
  const variantClass = classNames(
    "scale-75",
    { "scale-50": variant === "sm" },
    { "scale-110": variant === "lg" },
    { "scale-150": variant === "xl" }
  );
  return (
    <div
      className={`grid place-items-center transition-opacity duration-200 ${hideClass} ${className}`}
      onClick={handleClick}
    >
      <svg
        className={`${variantClass}`}
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icon}
      </svg>
    </div>
  );
};

export default ArrowButton;
