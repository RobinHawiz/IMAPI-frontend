import "@src/main.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@src/contexts/AuthProvider";
import { queryClient } from "@src/queryClient";
import App from "@src/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        lazy: () => import("@routes/public/home/Page"),
        hydrateFallbackElement: <></>,
      },
      {
        path: "/movies",
        lazy: () => import("@routes/public/movies/Page"),
        hydrateFallbackElement: <></>,
      },
      {
        path: "/sign-in",
        lazy: () => import("@routes/public/sign-in/Page"),
        hydrateFallbackElement: <></>,
      },
      {
        path: "/sign-up",
        lazy: () => import("@routes/public/sign-up/Page"),
        hydrateFallbackElement: <></>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>,
);
