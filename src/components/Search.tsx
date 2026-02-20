import { useState } from "react";
import search from "@images/search.svg";

type Props = {
  onSearch: (searchTerm: string) => void;
};

function Search({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      className="flex-center xs:mb-10 mb-5 w-full flex-wrap gap-x-4 gap-y-6 sm:mb-15"
      onSubmit={(e) => handleSubmit(e)}
    >
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        className="shadow-accent-blur-low text-primary bg-accent hover:shadow-accent-blur-high hover:bg-accent-muted hidden cursor-pointer rounded-full px-6 py-4 text-base font-bold transition-all duration-200 sm:block"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
