import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthProvider";
import { ReviewAPI } from "@api/review";
import type { Review } from "@customTypes/review";
import profile from "@images/profile.svg";
import star from "@images/star.svg";

type Props = Omit<Review, "tmdbMovieId">;

function ReviewCard({
  id,
  title,
  reviewText,
  rating,
  createdAt,
  username,
  likes,
  likedByMe,
}: Props) {
  const reviewApi = new ReviewAPI();
  const [isLikedByMe, setIsLikedByMe] = useState(!!likedByMe);
  const [reviewLikes, setReviewLikes] = useState(likes);
  const navigate = useNavigate();
  const { token } = useAuth();

  const likeReview = async () => {
    if (!token) {
      navigate("/sign-in");
      return;
    }

    try {
      setReviewLikes(reviewLikes + 1);
      setIsLikedByMe(true);
      await reviewApi.likeReview(id);
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    }
  };

  const dislikeReview = async () => {
    try {
      setReviewLikes(reviewLikes - 1);
      setIsLikedByMe(false);
      await reviewApi.dislikeReview(id);
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    }
  };

  return (
    <article className="hover:shadow-elevation-low bg-subtle/10 border-subtle/20 hover:border-accent/30 hover:bg-accent/2 rounded-2xl border border-solid p-6 transition-all duration-300 ease-in-out hover:-translate-y-2">
      <div className="mb-2.5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-center bg-muted/65 h-10 w-10 rounded-full">
            <img src={profile} className="h-4.5 w-4" alt="Your profile" />
          </div>
          <div>
            <p className="leading-[1.2] font-semibold">{username}</p>
            <p className="text-muted text-sm">{createdAt.split(" ")[0]}</p>
          </div>
        </div>
        <div className="flex-center bg-accent/10 h-7 w-12 gap-1 rounded-sm">
          <img src={star} className="h-3.5 w-3.5" aria-hidden="true" />
          <p className="text-accent leading-[1.2] font-semibold">{rating}</p>
        </div>
      </div>
      <div className="border-subtle/20 mb-4.5 border-b border-solid pb-2.5">
        <h3 className="mb-1 text-lg font-bold">{title}</h3>
        <p>{reviewText}</p>
      </div>
      <div>
        <button
          className={`flex-center focus-visible:ring-accent group cursor-pointer gap-2 rounded-sm p-1 transition-all duration-200 outline-none focus-visible:ring-2 ${isLikedByMe ? "text-accent" : "text-muted"}`}
          onClick={() => (isLikedByMe ? dislikeReview() : likeReview())}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 ease-in-out group-hover:scale-115"
          >
            <path
              d="M1.67344 9.07907L8.02617 15.0099C8.28984 15.256 8.63789 15.3931 9 15.3931C9.36211 15.3931 9.71016 15.256 9.97383 15.0099L16.3266 9.07907C17.3953 8.08415 18 6.68845 18 5.22946V5.02555C18 2.56813 16.2246 0.47282 13.8023 0.0685232C12.1992 -0.198664 10.568 0.325164 9.42188 1.47126L9 1.89313L8.57812 1.47126C7.43203 0.325164 5.80078 -0.198664 4.19766 0.0685232C1.77539 0.47282 0 2.56813 0 5.02555V5.22946C0 6.68845 0.604687 8.08415 1.67344 9.07907V9.07907"
              className="fill-current"
            />
          </svg>
          <p className="transition-colors duration-200 ease-in-out">
            {reviewLikes}
          </p>
        </button>
      </div>
    </article>
  );
}

export default ReviewCard;
