import React from "react";

type directions = "left" | "right";
const leftArrowSvgPath = (
  <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
);
const rightArrowSvgPath = (
  <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
);

const ArrowButton = ({
  direction,
  onClick: handleClick,
  hide = false,
  className,
}: {
  direction: directions;
  onClick?: () => void;
  hide?: boolean;
  className?: string;
}) => {
  const icon = direction === "left" ? leftArrowSvgPath : rightArrowSvgPath;
  return (
    <div
      className={`p-1 rounded cursor-pointer transition-opacity duration-200 ${
        hide && "opacity-0 cursor-default"
      } ${className}`}
      onClick={handleClick}
    >
      <svg
        className="transition-colors duration-500 scale-75 stroke-2 fill-gray-300 hover:fill-gray-50"
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
