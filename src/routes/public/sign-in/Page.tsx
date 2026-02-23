import SignInForm from "@routes/public/sign-in/components/SignInForm";

export function Component() {
  return (
    <section className="flex-center xs:px-4 mt-15 flex-col px-2">
      <h1 className="mb-1 text-3xl font-black md:text-4xl lg:text-5xl">
        Welcome back<span className="text-accent">.</span>
      </h1>
      <p className="text-muted mb-5 text-center text-sm sm:mb-10 md:text-base">
        Sign in to write and manage your reviews
      </p>
      <SignInForm />
    </section>
  );
}
