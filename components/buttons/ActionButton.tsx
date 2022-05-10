import classNames from "classnames";
import React from "react";

type variant = "blue";
type size = "base" | "lg";

type OwnProps = {
  variant?: variant;
  tooltip?: string;
};

type ActionButtonProps = OwnProps & React.ComponentPropsWithRef<"button">;

const ActionButton = ({
  variant = "blue",
  children,
  className,
  tooltip,
  ...rest
}: ActionButtonProps) => {
  return (
    <button
      aria-label={`${tooltip}`}
      className={classNames(
        "relative rounded-full w-10 h-10 grid place-items-center group cursor-pointer",
        { "bg-dark-blue": variant === "blue" },
        className
      )}
      {...rest}
    >
      {children}
      {tooltip && (
        <div className="min-w-max invisible absolute top-10 px-3 py-2 mt-0.5 text-xs rounded opacity-60 bg-dark-blue group-hover:visible 2xl:text-sm">
          {tooltip}
        </div>
      )}
    </button>
  );
};

export default ActionButton;
