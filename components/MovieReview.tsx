import React, { useRef } from "react";
import { Review } from "../@types/models/review";
import Properties from "config/properties";
import { generateImageUrlByPathOrDefault } from "lib/api/multimedia-api";
import Avatar from "components/miscellaneous/Avatar";
import ExpandableText from "components/miscellaneous/ExpandableText";
import VoteBadge from "components/miscellaneous/VoteBadge";

type Props = {
  review: Review;
};

const MovieReview = ({ review }: Props) => {
  const reviewContentRef = useRef(null);

  const { author, content, created_at: createdAt, id } = review;
  const { rating, avatar_path } = review.author_details;
  const reviewDate = new Date(createdAt);
  const reviewDateAsString = reviewDate.toLocaleDateString();
  const avatarImage = generateImageUrlByPathOrDefault(avatar_path, null);

  return (
    <div key={id} className="max-w-4xl p-4 border-b border-b-gray-500/50">
      {/* Avatar + Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar src={avatarImage} />
          <div className="ml-4">
            <h2 className="text-xl ">
              <span className="capitalize">{author}</span>{" "}
              <span className="text-lg">says</span>
            </h2>
            <p className="text-xs font-light text-primary-500/80">
              {reviewDateAsString}
            </p>
          </div>
        </div>
        {rating && <VoteBadge vote={rating} size="sm" />}
      </div>
      {/* Content */}
      <ExpandableText
        as={"p"}
        className="mt-6 ml-6 text-sm font-normal leading-relaxed text-gray-300"
        maxLines={5}
        ref={reviewContentRef}
      >
        {content}
      </ExpandableText>
    </div>
  );
};

export default MovieReview;
