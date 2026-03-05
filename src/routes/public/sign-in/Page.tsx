import useDocumentTitle from "@hooks/useDocumentTitle";
import SignInForm from "@routes/public/sign-in/components/SignInForm";

export function Component() {
  useDocumentTitle("IMAPI | Sign In");

  return (
    <section className="xs:px-4 mx-auto mt-15 max-w-lg px-2">
      <h1 className="mb-3 text-center text-3xl font-black md:text-4xl lg:text-5xl">
        Welcome back<span className="text-accent">.</span>
      </h1>
      <p className="text-muted mb-5 text-center text-sm sm:mb-8 md:text-base">
        Sign in to write and manage your reviews
      </p>
      <SignInForm />
    </section>
  );
}
