import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import useScrollToTop from "@hooks/useScrollToTop";

function App() {
  useScrollToTop();

  return (
    <>
      <Header />
      <main className="mb-20 min-h-svh pt-40 md:pt-25">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
