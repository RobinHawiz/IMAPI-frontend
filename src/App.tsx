import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import useScrollToTop from "@hooks/useScrollToTop";

function App() {
  useScrollToTop();

  return (
    <>
      <Header />
      {/* Default spacing keeps page content clear of the fixed header and footer.
    On the movie details page (`section#movie-details`), that spacing is removed
    so the backdrop can stretch edge-to-edge. */}
      <main className="mb-20 min-h-svh pt-40 has-[section#movie-details]:mb-0 has-[section#movie-details]:pt-0 md:pt-25">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
