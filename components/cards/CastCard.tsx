import React from "react";
import { CastCredit } from "../../@types/models/credit";
import { Properties } from "../../config/properties";
import { generateImageUrlByPathOrDefault } from "../../lib/api/image-api";

type Props = {
  cast: CastCredit;
};

const CastCard = ({ cast }: Props) => {
  const { name, character, profile_path } = cast;
  const castProfileImage = generateImageUrlByPathOrDefault(
    profile_path,
    Properties.defaultAvatarImageSrc
  );
  return (
    <div className="flex-none overflow-hidden rounded-lg cursor-pointer w-36">
      {/* thumbnail */}
      <div className="h-40">
        <img
          className="object-cover w-full h-full"
          src={castProfileImage}
          alt="Cast Profile Image"
        />
      </div>
      {/* info */}
      <div className="h-full p-2 bg-gray-500/10">
        <h2 className="text-sm font-semibold tracking-wide">{name}</h2>
        <p className="mt-1 text-xs font-medium text-primary-500">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
