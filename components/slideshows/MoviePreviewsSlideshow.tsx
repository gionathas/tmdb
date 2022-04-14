import React, { useState } from "react";
import { Genre } from "../../@types/models/genre";
import ArrowIcon from "../icons/ArrowIcon";
import MoviePreviewCard, {
  size as MovieCardSize,
} from "../cards/MoviePreviewCard";
import { MoviePreview } from "../../@types/models/movie";

const moviesShowned = 6; //TODO: adapt to various screen size
const x_axis_transform_percentage = 17; //TODO: adapt to various screen size

const MoviePreviewSlideshow = ({
  title,
  movies,
  genresMap,
  previewSize = "md",
}: {
  title: string;
  movies: MoviePreview[];
  genresMap: Genre[];
  previewSize?: MovieCardSize;
}) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const onLeftSlide = () => {
    if (sliderIndex === 0) return;
    setSliderIndex(sliderIndex - 1);
  };

  const onRightSlide = () => {
    if (sliderIndex + moviesShowned >= movies.length - 1) return;
    setSliderIndex(sliderIndex + 1);
  };

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">{title}</h2>
        <div className="mr-6">
          <NavigationArrows
            onLeftClick={onLeftSlide}
            onRightClick={onRightSlide}
          />
        </div>
      </div>
      <div
        className="flex mt-4 space-x-3 transition-transform duration-500"
        style={{
          transform: `translate3d(${
            -sliderIndex * x_axis_transform_percentage
          }%, 0, 0)`,
        }}
      >
        {movies.map((movie) => (
          <MoviePreviewCard
            key={movie.id}
            movie={movie}
            genresMap={genresMap}
            size={previewSize}
          />
        ))}
      </div>
    </div>
  );
};

const NavigationArrows = ({
  onLeftClick,
  onRightClick,
}: {
  onLeftClick: () => void;
  onRightClick: () => void;
}) => {
  return (
    <div className="flex space-x-4">
      <ArrowIcon arrow="left" onClick={onLeftClick} />
      <ArrowIcon arrow="right" onClick={onRightClick} />
    </div>
  );
};

export default MoviePreviewSlideshow;
