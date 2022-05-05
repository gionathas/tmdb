import MovieCard from "components/cards/MovieCard";
import { TmdbPaginatedResponse } from "lib/api/types";
import React from "react";
import { MoviePreview } from "../../@types/models/movie";
import PaginatedList from "./PaginatedList";

type Props = {
  results: TmdbPaginatedResponse<MoviePreview>;
  onPageChange: (page: number) => void;
  className?: string;
  isLoading?: boolean;
  page: number;
};

const MovieResultList = ({
  results,
  onPageChange,
  className,
  isLoading,
  page,
}: Props) => {
  const { results: items } = results;

  return (
    <PaginatedList
      className={className}
      isLoading={isLoading}
      title={<h2 className="mb-2 text-xl text-center sm:text-left">Results</h2>}
      emptyTitle={"No results found!"}
      totalPages={results.total_pages}
      onPageChange={onPageChange}
      page={page}
      items={items}
      renderItem={(movie) => (
        <MovieCard movie={movie} variant="base" size="sm" />
      )}
      keyExtractor={(movie) => String(movie.id)}
    />
  );
};

export default MovieResultList;
