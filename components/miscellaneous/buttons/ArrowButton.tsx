import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";

export type ArrowDirection = "left" | "right";
export type ArrowVariant = "sm" | "base" | "lg" | "xl";

const ArrowButton = ({
  direction,
  onClick: handleClick,
  className,
  variant = "base",
}: {
  direction: ArrowDirection;
  onClick?: () => void;
  className?: string;
  variant?: ArrowVariant;
}) => {
  const size = classNames(
    { "w-10 h-10": variant === "sm" },
    { "w-11 h-11": variant === "base" },
    { "w-14 h-14": variant === "lg" },
    { "w-20 h-20": variant === "xl" }
  );
  const classes = `${size} ${className} `;

  return direction === "left" ? (
    <ChevronLeftIcon className={classes} onClick={handleClick} />
  ) : (
    <ChevronRightIcon className={classes} onClick={handleClick} />
  );
};

export default ArrowButton;
