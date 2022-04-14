import classNames from "classnames";
import React from "react";

type size = "sm";

const Avatar = ({
  src,
  size = "sm",
}: {
  src: string | undefined;
  size?: size;
}) => {
  const avatarSize = classNames({ "w-10 h-10": size == "sm" });
  return (
    <div className={`inline-block rounded-full ${avatarSize} overflow-hidden`}>
      <img
        className="object-cover w-full h-full"
        src={src}
        alt="avatar image"
      />
    </div>
  );
};

export default Avatar;
