import classNames from "classnames";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

type directions = "left" | "right";

export type variant = "sm" | "base" | "lg" | "xl";

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
  const hideClass = (hide && "opacity-0 cursor-default") || "cursor-pointer";
  const size = classNames(
    { "w-5 h-5": variant === "sm" },
    { "w-8 h-8": variant === "base" },
    { "w-12 h-12": variant === "lg" },
    { "w-20 h-20": variant === "xl" }
  );
  const classes = `${hideClass} ${className} ${size}`;

  return direction === "left" ? (
    <ChevronLeftIcon className={classes} onClick={handleClick} />
  ) : (
    <ChevronRightIcon className={classes} onClick={handleClick} />
  );
};

export default ArrowButton;
