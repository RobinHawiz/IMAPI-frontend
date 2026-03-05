import "@src/main.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@src/contexts/AuthProvider";
import { queryClient } from "@src/queryClient";
import App from "@src/App";
import ProtectedRoute from "@components/ProtectedRoute";

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
        path: "/movies/:id",
        lazy: () => import("@routes/public/movie/Page"),
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
  {
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/your-reviews",
        lazy: () => import("@routes/protected/your-reviews/Page"),
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
