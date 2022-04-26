import React from "react";
import { Review } from "../@types/models/review";
import MovieReview from "./MovieReview";

type Props = {
  reviews: Review[];
  className?: string;
};

const MovieReviewList = ({ reviews, className = "" }: Props) => {
  const noReviewWarningTitle = (
    <h2 className="mt-4 ml-4 text-sm font-light">
      No review of this movie has been written yet!
    </h2>
  );

  const movieReviewList = (
    <div className="space-y-4">
      {reviews.map((review) => (
        <MovieReview key={review.id} review={review} />
      ))}
    </div>
  );

  return (
    <div className={className}>
      <h2 className="text-xl font-medium">Reviews</h2>
      {reviews.length > 0 ? movieReviewList : noReviewWarningTitle}
    </div>
  );
};

export default MovieReviewList;
