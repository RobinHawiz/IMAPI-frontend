import { useEffect, useState, type SubmitEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginFormSchema, type LoginCredentials } from "@customTypes/user";
import { useAuth } from "@contexts/AuthProvider";

function SignInForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token, login } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validation
    const result = loginFormSchema.safeParse(data);
    if (result.error) {
      setErrorMessage(result.error.issues[0].message);
      return;
    }

    // Form submission
    try {
      setIsLoading(true);
      const cred: LoginCredentials = { ...result.data };
      await login(cred);
      navigate("/");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : `${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      id="submit-form"
      onSubmit={(e) => handleSubmit(e)}
      className="bg-modal/85 border-subtle/60 flex w-full max-w-md flex-col gap-6 rounded-3xl border border-solid p-8 px-4"
    >
      <div className="flex flex-col gap-2">
        <label className="self-start text-sm font-semibold" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className="border-subtle/60 text-secondary bg-primary focus:border-accent w-full rounded-2xl border border-solid px-4 py-3.5 text-sm transition-colors duration-200 ease-in-out focus:outline-none"
          type="text"
          name="username"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="self-start text-sm font-semibold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="border-subtle/60 text-secondary bg-primary focus:border-accent w-full rounded-2xl border border-solid px-4 py-3.5 text-sm transition-colors duration-200 ease-in-out focus:outline-none"
          type="password"
          name="password"
        />
      </div>
      <div className="flex justify-between text-sm">
        <label className="label text-white">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-xs bg-primary text-primary checked:bg-accent border-subtle/60 checked:border-accent focus-within:outline-accent rounded-sm border border-solid transition-colors duration-200 ease-in-out [--noise:0]"
          />
          <span className="pb-0.5">Remember me</span>
        </label>
        <a
          href="#"
          className="text-muted focus-visible:ring-accent focus-visible:ring-offset-primary rounded-2xl p-1 transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:outline-none"
        >
          Forgot password?
        </a>
      </div>
      {errorMessage && (
        <p className="rounded-xl border border-red-500 px-3 py-2 text-sm text-red-500 sm:text-base">
          * {errorMessage}
        </p>
      )}
      {isLoading && (
        <div className="flex-center flex-col">
          <span className="loading loading-spinner text-accent w-8 sm:w-12"></span>
          <p className="text-accent mt-2 block text-sm sm:text-base">
            Signing in...
          </p>
        </div>
      )}
      <div>
        <button
          className="shadow-accent-blur-low text-primary bg-accent focus-visible:shadow-accent-blur-high focus-visible:bg-accent-muted hover:shadow-accent-blur-high hover:bg-accent-muted flex-center mb-8 w-full flex-1 cursor-pointer gap-2 rounded-xl px-6 py-4 text-sm font-bold transition-all duration-200 focus-visible:outline-none sm:text-base"
          type="submit"
          disabled={isLoading}
        >
          <p className="mb-0.5 sm:mb-0">Sign in</p>
        </button>
        <p className="text-muted text-center text-sm">
          Don't have an account?{" "}
          <NavLink to="/sign-up" className="text-accent">
            Sign up
          </NavLink>
        </p>
      </div>
    </form>
  );
}

export default SignInForm;
