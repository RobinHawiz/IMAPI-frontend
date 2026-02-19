import { useAuth } from "@src/contexts/AuthProvider";
import { NavLink } from "react-router-dom";
import logo from "@images/logo.svg";
import profile from "@images/profile.svg";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary/65 border-subtle/20 shadow-elevation-low fixed z-10 w-full border-b border-solid px-8 py-[1.2188rem] backdrop-blur-lg">
      <nav className="flex min-h-10 flex-col items-center justify-between gap-4 text-base font-medium md:flex-row">
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 md:gap-x-8">
          <li className="basis-full md:basis-auto">
            <NavLink to="/" aria-label="IMAPI home">
              <img
                className="mx-auto min-h-4.25 min-w-14.75"
                src={logo}
                aria-hidden="true"
              />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:text-secondary text-muted transition-colors duration-200 ${isActive ? "text-accent!" : ""}`
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:text-secondary text-muted transition-colors duration-200 ${isActive ? "text-accent!" : ""}`
              }
              to="/movies"
            >
              Movies
            </NavLink>
          </li>
          {user !== null && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  `hover:text-secondary text-muted transition-colors duration-200 ${isActive ? "text-accent!" : ""}`
                }
                to="/your-reviews"
              >
                Your reviews
              </NavLink>
            </li>
          )}
        </ul>
        <ul className="flex-center gap-8">
          {user === null ? (
            <>
              <li className="login-group">
                <NavLink
                  className={({ isActive }) =>
                    `hover:text-secondary text-muted transition-colors duration-200 ${isActive ? "text-accent!" : ""}`
                  }
                  to="/sign-in"
                >
                  Sign in
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:bg-accent-muted hover:shadow-accent-blur-low text-primary bg-accent rounded-full px-6 py-2 transition-all duration-200"
                  to="/sign-up"
                >
                  Sign up
                </NavLink>
              </li>
            </>
          ) : (
            <li className="flex items-center">
              <div className="flex-center gap-2">
                <div className="flex flex-col justify-center">
                  <p className="mb-0.5 text-base leading-none">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-muted text-end text-sm leading-none">
                    {user.username}
                  </p>
                </div>
                <div className="flex-center bg-muted/65 h-10 w-10 rounded-full">
                  <img src={profile} alt="Your profile" />
                </div>
              </div>
              <span className="bg-border-subtle mx-4 h-8 w-0.5"></span>
              <button
                className="hover:text-secondary text-muted cursor-pointer transition-colors duration-200"
                onClick={() => {
                  logout();
                }}
              >
                Sign out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
