import hero from "@images/hero.webp";
import search from "@images/search.svg";
import film from "@images/film.svg";
import star from "@images/star.svg";
import discussion from "@images/discussion.svg";

export function Component() {
  return (
    <>
      <section className="flex-center flex-col px-4">
        <img src={hero} aria-hidden="true" />
        <h1 className="mb-4 text-center text-4xl font-black md:text-5xl md:leading-14 lg:text-6xl lg:leading-17">
          All the{" "}
          <span className="to-accent bg-linear-to-r from-[#fff95b] bg-clip-text text-transparent">
            Movies
          </span>
          , <br /> None of the Database<span className="text-accent">.</span>
        </h1>
        <p className="text-muted mb-5 text-center text-lg sm:mb-10 md:text-xl">
          Browse, rate, and review films fetched live from TMDb.
        </p>
        <form className="flex-center mb-10 w-full flex-wrap gap-x-4 gap-y-6 sm:mb-15">
          <div className="relative w-full max-w-150 grow basis-90">
            <img
              className="absolute top-1/2 left-6 -translate-1/2 sm:left-8"
              src={search}
              aria-hidden="true"
            />
            <input
              className="border-muted shadow-elevation-low focus:border-accent w-full rounded-full border-2 border-solid px-10 py-4 text-sm transition-colors duration-200 focus:outline-none sm:px-14 sm:text-base"
              type="text"
              placeholder="Search through thousands of movies..."
            />
          </div>
          <button
            className="shadow-accent-blur-low text-primary bg-accent hover:shadow-accent-blur-high hover:bg-accent-muted cursor-pointer rounded-full px-10 py-4 text-sm font-bold transition-all duration-200 sm:text-base"
            onClick={() => {}}
          >
            Search
          </button>
        </form>
        <div className="flex-center w-full flex-wrap gap-8">
          <article className="bg-subtle/5 shadow-elevation-low border-subtle/20 hover:border-accent/30 hover:bg-accent/2 flex w-full max-w-95 grow basis-62 items-center gap-4 rounded-3xl border border-solid p-8 transition-colors duration-200">
            <div className="bg-accent/20 flex-center h-16 w-16 rounded-2xl">
              <img src={film} aria-disabled="true" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-wider md:text-3xl lg:text-4xl">
                10k+
              </h3>
              <p className="text-muted font-semibold">movies</p>
            </div>
          </article>
          <article className="bg-subtle/5 shadow-elevation-low border-subtle/20 hover:border-accent/30 hover:bg-accent/2 flex w-full max-w-95 grow basis-62 items-center gap-4 rounded-3xl border border-solid p-8 transition-colors duration-200">
            <div className="bg-accent/20 flex-center h-16 w-16 rounded-2xl">
              <img src={star} aria-disabled="true" />
            </div>
            <div>
              <h3 className="text-2xl font-black md:text-3xl lg:text-4xl">
                Community
              </h3>
              <p className="text-muted font-semibold">ratings</p>
            </div>
          </article>
          <article className="bg-subtle/5 shadow-elevation-low border-subtle/20 hover:border-accent/30 hover:bg-accent/2 flex w-full max-w-95 grow basis-62 items-center gap-4 rounded-3xl border border-solid p-8 transition-colors duration-200">
            <div className="bg-accent/20 flex-center h-16 w-16 rounded-2xl">
              <img src={discussion} aria-disabled="true" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-wider md:text-3xl lg:text-4xl">
                Fresh
              </h3>
              <p className="text-muted font-semibold">reviews daily</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
