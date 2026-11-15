import { SearchX } from "lucide-react";

/** Shown when a launched section has no verified records yet. */
export function EmptyCollection({ singular, children }: { singular: string; children?: React.ReactNode }) {
  return (
    <div className="card-surface flex flex-col items-start gap-4 p-6 sm:p-8">
      <SearchX aria-hidden="true" className="size-6 text-neon-pink" />
      <h2 className="font-heading text-3xl">No verified {singular.toLowerCase()}s yet</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        We only publish what can be backed by official material or checked in the game. Entries
        will appear here as they are verified — nothing is listed from rumours or guesswork.
      </p>
      {children}
    </div>
  );
}
