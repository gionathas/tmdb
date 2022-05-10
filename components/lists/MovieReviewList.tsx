import React from "react";
import { Review as ReviewType } from "../../@types/models/review";
import Review from "./items/Review";
import List from "./List";

type OwnProps = {
  reviews: ReviewType[];
};
type ReviewListProps = OwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof OwnProps>;

const MovieReviewList = ({ reviews, className, ...rest }: ReviewListProps) => {
  const title = <h2 className="text-xl font-medium">Reviews</h2>;
  const noReviewWarningTitle = (
    <h2 className="mt-4 ml-4 text-sm font-light">
      No review of this movie has been written yet!
    </h2>
  );

  return (
    <div className={className} {...rest}>
      <List
        title={title}
        emptyTitle={noReviewWarningTitle}
        items={reviews}
        renderItem={(review) => (
          <Review className="max-w-5xl p-4 mt-6 first:mt-0" review={review} />
        )}
        keyExtractor={(review) => review.id}
      />
    </div>
  );
};

export default MovieReviewList;
