import React from "react";
import { CastCredit } from "../../@types/models/credit";
import Properties from "../../config/properties";
import CastCard from "../cards/CastCard";
import Slideshow from "./Slideshow";

const { castSlideshowScrollXOffset: castSlideshowScrollOffset } = Properties;

type Props = {
  cast: CastCredit[];
};

const MovieCastSlideshow = ({ cast }: Props) => {
  return (
    <div className="rounded">
      <Slideshow
        classname="pt-4 pb-10"
        scrollOffset={castSlideshowScrollOffset}
        title={<h2 className="text-xl font-medium">Top Cast</h2>}
      >
        {cast.map((cast) => (
          <CastCard key={cast.id} cast={cast} />
        ))}
      </Slideshow>
    </div>
  );
};

export default MovieCastSlideshow;
