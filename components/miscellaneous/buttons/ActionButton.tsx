import classNames from "classnames";
import React from "react";

type variant = "blue";

const ActionButton = ({
  variant = "blue",
  content,
  tooltip,
}: {
  variant?: variant;
  content: React.ReactElement;
  tooltip?: string;
}) => {
  const bgColor = classNames({ "bg-dark-blue": variant === "blue" });
  return (
    <div
      className={`relative ${bgColor} rounded-full w-10 h-10 grid place-items-center group cursor-pointer`}
    >
      {content}
      {tooltip && (
        <div className="min-w-max invisible absolute top-10 px-3 py-2 mt-0.5 text-xs rounded opacity-60 bg-dark-blue group-hover:visible">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default ActionButton;
