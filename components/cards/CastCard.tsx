import classNames from "classnames";
import { Properties } from "config/properties";
import { buildProfilemageUrlOrDefault } from "lib/api/multimedia-api";
import Image from "next/image";
import React from "react";
import { CastCredit } from "../../@types/models/credit";

type OwnProps = {
  cast: CastCredit;
};

type CastCardProps = OwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof OwnProps>;

const defaultAvatar = Properties.DEFAULT_AVATART_IMG_SRC;

const CastCard = ({ cast, className, ...rest }: CastCardProps) => {
  const { name, character, profile_path } = cast;

  return (
    <div
      className={classNames(
        "flex-none overflow-hidden rounded-lg cursor-pointer w-36",
        className
      )}
      {...rest}
    >
      {/* thumbnail */}
      <div className="relative h-40">
        <Image
          src={buildProfilemageUrlOrDefault(
            profile_path,
            "w185",
            defaultAvatar
          )}
          alt="Profile Image"
          objectFit="cover"
          layout="fill"
          placeholder="blur"
          blurDataURL={defaultAvatar}
        />
      </div>
      {/* info */}
      <div className="h-full p-2 bg-gray-500/10">
        <h2 className="text-sm font-semibold 2xl:text-base name">{name}</h2>
        <p className="mt-1 text-xs font-medium 2xlxl:text-sm text-primary-500">
          {character}
        </p>
      </div>
    </div>
  );
};

export default CastCard;
