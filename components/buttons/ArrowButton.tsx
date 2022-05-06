import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";

export type ArrowDirection = "left" | "right";
export type ArrowVariant = "sm" | "base" | "lg" | "xl";

type OwnProps = {
  direction: ArrowDirection;
  variant?: ArrowVariant;
};

type ArrowButtonProps = OwnProps & React.ComponentPropsWithRef<"button">;

const ArrowButton = ({
  direction,
  variant = "base",
  ...rest
}: ArrowButtonProps) => {
  const size = classNames(
    { "w-10 h-10": variant === "sm" },
    { "w-11 h-11": variant === "base" },
    { "w-14 h-14": variant === "lg" },
    { "w-20 h-20": variant === "xl" }
  );
  // const classes = `${size} ${className} `;
  const icon =
    direction === "left" ? (
      <ChevronLeftIcon className={size} />
    ) : (
      <ChevronRightIcon className={size} />
    );

  return <button {...rest}>{icon}</button>;
};

export default ArrowButton;
