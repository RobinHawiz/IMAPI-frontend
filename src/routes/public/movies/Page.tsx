import { useNavigate } from "react-router-dom";
import Search from "@components/Search";
import MoviePage from "@routes/public/movies/components/MoviePage";
import { type PropsWithChildren } from "react";

function ComponentLayout({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center px-4 md:mt-15 md:px-8">
      <Search
        onSearch={(searchTerm: string) => {
          navigate(`/movies?query=${encodeURIComponent(searchTerm)}`);
        }}
      />
      {children}
    </section>
  );
}

export function ErrorBoundary() {
  return (
    <ComponentLayout>
      <h2 className="text-center text-red-500">
        Oops, something went wrong while loading movies. Please try again in a
        moment.
      </h2>
    </ComponentLayout>
  );
}

export function Component() {
  return (
    <ComponentLayout>
      <MoviePage />
    </ComponentLayout>
  );
}
