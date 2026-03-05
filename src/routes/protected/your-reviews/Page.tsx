import useDocumentTitle from "@hooks/useDocumentTitle";
import ReviewList from "@routes/protected/your-reviews/components/ReviewList";

export function Component() {
  useDocumentTitle("IMAPI | Your Reviews");

  return (
    <section className="xs:px-4 mx-auto mt-15 max-w-7xl px-2">
      <h1 className="mb-3 text-3xl font-black md:text-4xl lg:text-5xl">
        Your reviews<span className="text-accent">.</span>
      </h1>
      <p className="text-muted mb-5 text-sm sm:mb-8 md:text-base">
        Manage and edit all your movie reviews in one place
      </p>
      <ReviewList />
    </section>
  );
}
