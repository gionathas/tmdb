import React from "react";

type arrows = "left" | "right";
const leftArrowSvg = (
  <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
);
const rightArrowSvg = (
  <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
);

const ArrowIcon = ({
  arrow,
  onClick: handleClick,
}: {
  arrow: arrows;
  onClick?: () => void;
}) => {
  const icon = arrow === "left" ? leftArrowSvg : rightArrowSvg;
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <svg
        className="transition-colors duration-500 stroke-2 fill-gray-300 hover:fill-gray-50"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icon}
      </svg>
    </div>
  );
};

export default ArrowIcon;
