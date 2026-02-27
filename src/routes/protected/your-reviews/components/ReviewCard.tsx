import type { CurrentUserReview } from "@customTypes/review";
import star from "@images/star.svg";

type Props = Omit<CurrentUserReview, "tmdbMovieId">;

function ReviewCard({
  tmdbMovieTitle,
  reviewText,
  rating,
  createdAt,
  likes,
}: Props) {
  return (
    <article className="shadow-elevation-medium bg-subtle/10 border-subtle/20 hover:border-accent/30 hover:bg-accent/2 flex min-h-52 flex-col justify-between rounded-2xl border border-solid p-6 transition-colors duration-200 ease-in-out">
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="xs:text-lg truncate text-base font-bold">
            {tmdbMovieTitle}
          </h3>
          <div className="flex-center bg-accent/10 min-h-7 min-w-12 gap-1 rounded-sm">
            <img src={star} className="h-3.5 w-3.5" aria-hidden="true" />
            <p className="text-accent xs:text-base text-sm leading-[1.2] font-semibold">
              {rating}
            </p>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-secondary xs:text-base line-clamp-3 text-sm leading-[1.6]">
            {reviewText}
          </p>
        </div>
      </div>
      <div className="border-subtle/20 flex gap-3 border-t border-solid pt-3">
        <div className="text-muted flex-center gap-1.5">
          <svg
            width="11"
            height="13"
            viewBox="0 0 11 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.73214 0.609375C3.73214 0.27168 3.46942 0 3.14286 0C2.81629 0 2.55357 0.27168 2.55357 0.609375V1.625H1.57143C0.704688 1.625 0 2.35371 0 3.25V3.65625V4.875V11.375C0 12.2713 0.704688 13 1.57143 13H9.42857C10.2953 13 11 12.2713 11 11.375V4.875V3.65625V3.25C11 2.35371 10.2953 1.625 9.42857 1.625H8.44643V0.609375C8.44643 0.27168 8.18371 0 7.85714 0C7.53058 0 7.26786 0.27168 7.26786 0.609375V1.625H3.73214V0.609375V0.609375M1.17857 4.875H9.82143V11.375C9.82143 11.5984 9.64464 11.7813 9.42857 11.7813H1.57143C1.35536 11.7813 1.17857 11.5984 1.17857 11.375V4.875V4.875"
              className="fill-current"
            />
          </svg>
          <p className="text-sm">{createdAt.split(" ")[0]}</p>
        </div>
        <div className="flex-center text-muted gap-1">
          <svg
            width="15"
            height="13"
            viewBox="0 0 18 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.67344 9.07907L8.02617 15.0099C8.28984 15.256 8.63789 15.3931 9 15.3931C9.36211 15.3931 9.71016 15.256 9.97383 15.0099L16.3266 9.07907C17.3953 8.08415 18 6.68845 18 5.22946V5.02555C18 2.56813 16.2246 0.47282 13.8023 0.0685232C12.1992 -0.198664 10.568 0.325164 9.42188 1.47126L9 1.89313L8.57812 1.47126C7.43203 0.325164 5.80078 -0.198664 4.19766 0.0685232C1.77539 0.47282 0 2.56813 0 5.02555V5.22946C0 6.68845 0.604687 8.08415 1.67344 9.07907V9.07907"
              className="fill-current"
            />
          </svg>
          <p className="text-sm">{likes}</p>
        </div>
      </div>
    </article>
  );
}

export default ReviewCard;
