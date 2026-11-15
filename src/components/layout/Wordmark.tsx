import { Link } from "@tanstack/react-router";

/** Text-only brand mark. Deliberately unlike Rockstar's official logo. */
export function Wordmark() {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="GTA VI Guide home">
      <span aria-hidden="true" className="grid size-7 place-items-center rounded-sm border border-neon-cyan/50">
        <span className="size-2 rotate-45 bg-neon-pink transition-transform group-hover:rotate-[135deg]" />
      </span>
      <span className="font-heading text-2xl leading-none tracking-wide">
        GTA VI <span className="text-neon-cyan">Guide</span>
      </span>
    </Link>
  );
}
