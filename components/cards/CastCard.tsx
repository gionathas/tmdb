import React from "react";
import { CastCredit } from "../../@types/models/credit";
import { Properties } from "config/properties";
import { generateImageUrlByPathOrDefault } from "lib/api/multimedia-api";
import Image from "next/image";

type Props = {
  cast: CastCredit;
};

const defaultAvatar = Properties.defaultAvatarImageSrcPath;

const CastCard = ({ cast }: Props) => {
  const { name, character, profile_path } = cast;
  const castProfileImage = generateImageUrlByPathOrDefault(
    profile_path,
    defaultAvatar
  );
  return (
    <div className="flex-none overflow-hidden rounded-lg cursor-pointer w-36">
      {/* thumbnail */}
      <div className="relative h-40">
        <Image
          src={castProfileImage}
          alt="Profile Image"
          objectFit="cover"
          layout="fill"
          placeholder="blur"
          blurDataURL={defaultAvatar}
        />
      </div>
      {/* info */}
      <div className="h-full p-2 bg-gray-500/10">
        <h2 className="text-sm font-semibold name">{name}</h2>
        <p className="mt-1 text-xs font-medium text-primary-500">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
