import SignUpForm from "@routes/public/sign-up/components/SignUpForm";

export function Component() {
  return (
    <section className="xs:px-4 mx-auto mt-15 max-w-lg px-2">
      <h1 className="mb-3 text-center text-3xl font-black md:text-4xl lg:text-5xl">
        Create your <span className="text-accent">IM</span>API account
        <span className="text-accent">.</span>
      </h1>
      <p className="text-muted mb-5 text-center text-sm sm:mb-8 md:text-base">
        All the Movies, None of the Database
      </p>
      <SignUpForm />
    </section>
  );
}
