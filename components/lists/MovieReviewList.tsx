import Avatar from "components/miscellaneous/Avatar";
import ExpandableText from "components/miscellaneous/ExpandableText";
import VoteBadge from "components/miscellaneous/VoteBadge";
import { generateImageUrlByPathOrDefault } from "lib/api/multimedia-api";
import React, { useRef } from "react";
import { Review as ReviewType } from "../../@types/models/review";
import List from "./List";

type ReviewListProps = {
  reviews: ReviewType[];
  className?: string;
};

const MovieReviewList = ({ reviews, className = "" }: ReviewListProps) => {
  const title = <h2 className="text-xl font-medium">Reviews</h2>;
  const noReviewWarningTitle = (
    <h2 className="mt-4 ml-4 text-sm font-light">
      No review of this movie has been written yet!
    </h2>
  );

  return (
    <div className={className}>
      <List
        title={title}
        emptyTitle={noReviewWarningTitle}
        items={reviews}
        renderItem={(review) => <Review review={review} />}
        keyExtractor={(review) => review.id}
      />
    </div>
  );
};

type ReviewProps = {
  review: ReviewType;
};

const Review = ({ review }: ReviewProps) => {
  const reviewContentRef = useRef(null);

  const { author, content, created_at: createdAt } = review;
  const { rating, avatar_path } = review.author_details;
  const reviewDate = new Date(createdAt);
  const reviewDateAsString = reviewDate.toLocaleDateString();

  const reviewInfo = (
    <>
      <h2>
        <span className="text-xl capitalize">{author}</span>{" "}
        <span className="text-lg">says</span>
      </h2>
      <p className="text-xs font-light lg:text-sm text-primary-500/80">
        {reviewDateAsString}
      </p>
    </>
  );

  const reviewHeader = (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Avatar src={generateImageUrlByPathOrDefault(avatar_path, null)} />
        <div className="ml-4">{reviewInfo}</div>
      </div>
      {rating && <VoteBadge vote={rating} size="sm" />}
    </div>
  );

  const reviewContent = (
    <ExpandableText
      as={"p"}
      className="mt-6 ml-6 text-sm font-normal leading-relaxed text-gray-300 xl:text-base"
      maxLines={5}
      ref={reviewContentRef}
    >
      {content}
    </ExpandableText>
  );

  return (
    <div className="max-w-5xl p-4 border-b border-b-gray-500/50">
      {reviewHeader}
      {reviewContent}
    </div>
  );
};

export default MovieReviewList;
