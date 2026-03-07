# IMAPI Frontend

IMAPI is a movie discovery and review frontend built with React + TypeScript.
Users can search movies, view movie details, read community reviews, and (when signed in) create and manage their own reviews.

## Features

- Search movies from the `/movies` page (query string driven: `?query=...`).
- View individual movie details on `/movies/:id`.
- Read movie reviews in a modal from movie cards.
- Like and dislike reviews.
- Sign up and sign in with JWT-based auth.
- Create reviews (rating 1-10 stars), edit reviews, and delete reviews.
- Access a protected `/your-reviews` page for managing your own reviews.
- Route-level document titles and lazy-loaded routes.

## Tech Stack

- **React 19**
- **TypeScript**
- **React Router 7** (client-side routing)
- **TanStack Query** (data fetching and server-state caching)
- **Zod** (schema validation)
- **Tailwind CSS v4**
- **DaisyUI** (Tailwind component library)
- **Vite** (dev server + build)

## Project Structure

```bash
src/
├── api/                     # API clients (auth, user, movie, review)
├── components/              # Shared UI components
├── contexts/                # Auth context/provider
├── hooks/                   # React Query options + custom hooks
├── routes/                  # Route pages (public + protected)
├── types/                   # Domain and validation types (Zod)
├── utils/                   # Utilities
├── App.tsx                  # App layout (header/footer/outlet)
├── main.css                 # Tailwind theme + global styles
├── main.tsx                 # Router + providers
└── queryClient.ts           # TanStack Query client setup

public/
└── images/                  # Static images/icons
```

## Authentication & API

- JWT token is stored in `localStorage` under `token`.
- Protected routes are guarded by `ProtectedRoute`.
- Token validation happens via backend `/api/auth` endpoint.
- Authenticated requests send `Authorization: Bearer <token>`.
- The frontend talks to a backend API that exposes movie and review endpoints.

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Current deployed backend used in this project:

- `https://imapi-backend.azurewebsites.net/api`

## Getting Started

### Prerequisites

- Node.js
- npm

### Install

```code
npm install
```

### Run development server

```code
npm run dev
```

The frontend runs locally on:

- `http://localhost:5173`

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript check + production build
npm run preview  # Preview production build
```

> [!NOTE]
> Movie data is served through the backend (which integrates with [TMDb](https://www.themoviedb.org/)).
