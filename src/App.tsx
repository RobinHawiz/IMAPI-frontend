import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="mb-20 pt-40 md:pt-25">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
