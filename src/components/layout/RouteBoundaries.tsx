import { Link, useRouter, type ErrorComponentProps } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function NotFoundView({
  title = "Page not found",
  message = "This page doesn't exist or has moved. Try one of the sections below.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <section className="container-site flex flex-col items-start py-20 sm:py-28">
      <p className="eyebrow">Error 404</p>
      <h1 className="font-heading mt-3 text-6xl sm:text-7xl">{title}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{message}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="neon" size="lg">
          <Link to="/">Back to home</Link>
        </Button>
        <Button asChild variant="outlineNeon" size="lg">
          <Link to="/vehicles">Browse vehicles</Link>
        </Button>
      </div>
    </section>
  );
}

export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  console.error(error);
  return (
    <section className="container-site flex flex-col items-start py-20">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="font-heading mt-3 text-5xl">This page didn't load</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">Please try again in a moment.</p>
      <Button
        className="mt-8"
        variant="neon"
        size="lg"
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        Try again
      </Button>
    </section>
  );
}
