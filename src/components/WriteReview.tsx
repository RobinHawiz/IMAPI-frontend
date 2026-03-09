import { useState, type SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { reviewAddMutationOptions } from "@hooks/queryOptions";
import { addReviewSchema, type ReviewCreatePayload } from "@customTypes/review";
import paperPlane from "@images/paper-plane.svg";
import cancel from "@images/cancel.svg";
import close from "@images/close.svg";

type Props = {
  tmdbMovieId: string;
  title: string;
};

function WriteReview({ tmdbMovieId, title }: Props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { mutateAsync: addReviewMutation, isPending: isLoading } = useMutation(
    reviewAddMutationOptions(tmdbMovieId),
  );

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validation
    const result = addReviewSchema.safeParse(data);
    if (result.error) {
      setErrorMessage(result.error.issues[0].message);
      return;
    }

    // Form submission
    try {
      const review: ReviewCreatePayload = { ...result.data };
      await addReviewMutation(review);
      setSuccessMessage("Your review has been published!");
      form.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : `${err}`);
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(
      "write-review-modal",
    ) as HTMLDialogElement | null;

    modal?.close();
  };

  const resetForm = () => {
    const submitForm = document.getElementById(
      "submit-form",
    ) as HTMLFormElement | null;

    setTimeout(() => {
      submitForm?.reset();
      setErrorMessage("");
      setSuccessMessage("");
    }, 500);
  };

  return (
    <dialog id="write-review-modal" className="modal">
      <div className="modal-box w-full max-w-3xl px-4 shadow-none">
        <form method="dialog">
          <button
            className="focus-visible:border-accent border-subtle/60 xs:p-3 xs:top-13 xs:right-12 absolute top-10 right-8.5 z-10 cursor-pointer rounded-full border border-solid bg-white/5 p-2.5 transition-colors duration-200 ease-in-out hover:bg-white/10 focus-visible:outline-none"
            aria-label="Close modal"
            disabled={isLoading}
            onClick={() => {
              closeModal();
              resetForm();
            }}
          >
            <img
              src={close}
              className="xs:h-3 xs:w-3 h-2.5 w-2.5"
              aria-hidden="true"
            />
          </button>
        </form>
        <form
          id="submit-form"
          onSubmit={(e) => handleSubmit(e)}
          className="bg-modal/85 xs:p-8 border-subtle/60 flex flex-col gap-6 rounded-3xl border border-solid p-4 backdrop-blur-lg"
        >
          <div>
            <h2 className="text-2xl font-black md:text-3xl">
              Write a Review<span className="text-accent">.</span>
            </h2>
            <p className="text-muted mr-10 text-sm sm:text-base">
              Share your thoughts and help others discover great movies
            </p>
          </div>
          <input type="hidden" value={tmdbMovieId} name="tmdbMovieId" />
          <input type="hidden" value={title} name="tmdbMovieTitle" />
          <div className="flex flex-col gap-1">
            <label
              className="self-start text-sm font-semibold sm:text-base"
              htmlFor="movie-title"
            >
              Movie Title
            </label>
            <input
              id="movie-title"
              className="border-subtle/60 text-muted bg-primary w-full rounded-2xl border-2 border-solid px-4 py-3.5 text-sm sm:text-base"
              type="text"
              value={title}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="self-start text-sm font-semibold sm:text-base"
              htmlFor="review-title"
            >
              Review Title
            </label>
            <input
              id="review-title"
              className="border-subtle/60 text-secondary bg-primary focus:border-accent w-full rounded-2xl border-2 border-solid px-4 py-3.5 text-sm transition-colors duration-200 ease-in-out focus:outline-none sm:text-base"
              type="text"
              name="title"
              placeholder="Give your review a catchy title..."
            />
          </div>
          <fieldset className="rating rating-sm">
            <legend className="mb-2 w-full animate-none text-sm font-semibold opacity-100 sm:text-base">
              Your Rating
            </legend>
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 opacity-100"
              value={1}
              aria-label="1 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 mx-1 opacity-100"
              value={2}
              aria-label="2 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 opacity-100"
              value={3}
              aria-label="3 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 mx-1 opacity-100"
              value={4}
              aria-label="4 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 opacity-100"
              value={5}
              aria-label="5 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 mx-1 opacity-100"
              value={6}
              aria-label="6 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 opacity-100"
              value={7}
              aria-label="7 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 mx-1 opacity-100"
              value={8}
              aria-label="8 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent has-[~input:checked]:bg-accent xs:h-8 xs:w-8 opacity-100"
              value={9}
              aria-label="9 star"
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-muted checked:bg-accent xs:h-8 xs:w-8 ml-1 opacity-100"
              value={10}
              aria-label="10 star"
            />
          </fieldset>
          <div className="flex flex-col gap-2">
            <label
              className="self-start text-sm font-semibold sm:text-base"
              htmlFor="review-text"
            >
              Your Review
            </label>
            <textarea
              id="review-text"
              rows={8}
              className="border-subtle/60 text-secondary bg-primary focus:border-accent w-full rounded-2xl border-2 border-solid p-4 text-sm transition-colors duration-200 ease-in-out focus:outline-none sm:text-base"
              name="reviewText"
              placeholder="Share your thoughts about the movie... What did you like? What stood out? How did it make you feel?"
            ></textarea>
          </div>
          {errorMessage && (
            <p className="rounded-xl border border-red-500 px-3 py-2 text-sm text-red-500 sm:text-base">
              * {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="rounded-xl border border-green-500 px-3 py-2 text-sm text-green-500 sm:text-base">
              {successMessage}
            </p>
          )}
          {isLoading && (
            <div className="flex-center flex-col">
              <span className="loading loading-spinner text-accent w-8 sm:w-12"></span>
              <p className="text-accent mt-2 block text-sm sm:text-base">
                Publishing review...
              </p>
            </div>
          )}
          <div className="flex flex-row gap-4">
            <button
              className="shadow-accent-blur-low text-primary bg-accent focus-visible:shadow-accent-blur-high focus-visible:bg-accent-muted hover:shadow-accent-blur-high hover:bg-accent-muted flex-center flex-1 cursor-pointer gap-2 rounded-xl px-6 py-4 text-sm font-bold transition-all duration-200 focus-visible:outline-none sm:text-base"
              type="submit"
              disabled={isLoading}
            >
              <img src={paperPlane} className="h-4 w-4" aria-hidden="true" />
              <p className="mb-0.5 sm:mb-0">
                Publish <span className="xs:inline hidden">Review</span>
              </p>
            </button>
            <button
              className="text-secondary focus-visible:border-accent flex-center border-subtle/60 flex-1 cursor-pointer gap-2 rounded-xl border border-solid bg-white/5 px-6 py-4 text-sm font-semibold transition-all duration-200 hover:bg-white/10 focus-visible:outline-none sm:text-base"
              aria-label="Close modal"
              disabled={isLoading}
              onClick={() => {
                closeModal();
                resetForm();
              }}
              type="button"
            >
              <img src={cancel} className="h-2.5 w-2.5" aria-hidden="true" />
              <p className="mb-0.5 sm:mb-0">Cancel</p>
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          className="cursor-default"
          aria-label="Close modal"
          disabled={isLoading}
          onClick={() => {
            closeModal();
            resetForm();
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
}

export default WriteReview;
