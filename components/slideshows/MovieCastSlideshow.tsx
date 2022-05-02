import classNames from "classnames";
import React from "react";
import { CastCredit } from "../../@types/models/credit";
import Properties from "../../config/properties";
import CastCard from "../cards/CastCard";
import Slideshow from "./Slideshow";

const { castSlideshowDefaultScrollXOffset } = Properties;

type Props = {
  cast: CastCredit[];
  className?: string;
  scrollOffset?: number;
};

const title = <h2 className="text-xl font-medium">Top Cast</h2>;

const MovieCastSlideshow = ({
  cast,
  className,
  scrollOffset = castSlideshowDefaultScrollXOffset,
}: Props) => {
  return (
    <Slideshow
      className={classNames("overflow-hidden", className)}
      scrollOffset={scrollOffset}
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
