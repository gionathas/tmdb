import React from "react";
import { Review } from "../@types/models/review";
import MovieReview from "./MovieReview";

type Props = {
  reviews: Review[];
  className?: string;
};

const MovieReviewList = ({ reviews, className = "" }: Props) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-medium">Reviews</h2>
      {reviews.length === 0 && (
        <p className="mt-4 ml-4 text-sm font-light">
          No review of this movie has been written yet!
        </p>
      )}
      <div className="space-y-4">
        {reviews.map((review) => (
          <MovieReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default MovieReviewList;
