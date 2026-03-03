import z from "zod";

export type Review = {
  id: string;
  userId: string;
  tmdbMovieId: string;
  tmdbMovieTitle: string;
  title: string;
  reviewText: string;
  rating: number;
  createdAt: string;
  username: string;
  likes: number;
  likedByMe: 0 | 1;
};

export type CurrentUserReview = Omit<Review, "likedByMe">;

export type ReviewCreatePayload = z.infer<typeof addReviewSchema>;

export type ReviewUpdatePayload = z.infer<typeof updateReviewSchema>;

export const addReviewSchema = z.object({
  tmdbMovieId: z.string("The selected movie is not valid."),
  tmdbMovieTitle: z.string("The selected movie is not valid."),
  title: z
    .string("Review title must be between 1 and 50 characters.")
    .min(1, "Review title must be between 1 and 50 characters.")
    .max(50, "Review title must be between 1 and 50 characters."),
  reviewText: z
    .string("Review text must be between 50 and 1000 characters.")
    .min(50, "Review text must be between 50 and 1000 characters.")
    .max(1000, "Review text must be between 50 and 1000 characters."),
  rating: z.coerce
    .number("Rating has to be a number.")
    .min(1, "Rating must be between 1 and 10 stars.")
    .max(10, "Rating must be between 1 and 10 stars."),
});

export const updateReviewSchema = z.object({
  id: z.string("The selected review is not valid."),
  reviewTitle: z
    .string("Review title must be between 1 and 50 characters.")
    .min(1, "Review title must be between 1 and 50 characters.")
    .max(50, "Review title must be between 1 and 50 characters."),
  reviewText: z
    .string("Review text must be between 50 and 1000 characters.")
    .min(50, "Review text must be between 50 and 1000 characters.")
    .max(1000, "Review text must be between 50 and 1000 characters."),
  rating: z.coerce
    .number("Rating has to be a number.")
    .min(1, "Rating must be between 1 and 10 stars.")
    .max(10, "Rating must be between 1 and 10 stars."),
});
