import React from "react";
import { CastCredit } from "../../@types/models/credit";
import CastCard from "../cards/CastCard";

type Props = {
  cast: CastCredit[];
};

// TODO: Add navigation arrows
const MovieCastSlideshow = ({ cast }: Props) => {
  return (
    <div className="rounded">
      <h2 className="text-xl font-medium">Top Cast</h2>
      <div className="flex pt-4 pb-10 space-x-6 overflow-auto">
        {cast.slice(0, 12).map((cast) => (
          <CastCard key={cast.id} cast={cast} />
        ))}
      </div>
    </div>
  );
};

export default MovieCastSlideshow;
