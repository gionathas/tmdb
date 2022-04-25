import React from "react";
import { CastCredit } from "../../@types/models/credit";
import Properties from "../../config/properties";
import CastCard from "../cards/CastCard";
import Slideshow from "./Slideshow";

const { castSlideshowScrollXOffset: castSlideshowScrollOffset } = Properties;

type Props = {
  cast: CastCredit[];
  className?: string;
};

const title = <h2 className="text-xl font-medium">Top Cast</h2>;

const MovieCastSlideshow = ({ cast, className = "" }: Props) => {
  return (
    <Slideshow
      className={`overflow-hidden ${className}`}
      scrollOffset={castSlideshowScrollOffset}
      title={title}
      arrowVariant="sm"
    >
      {cast.map((cast) => (
        <CastCard key={cast.id} cast={cast} />
      ))}
    </Slideshow>
  );
};

export default MovieCastSlideshow;
