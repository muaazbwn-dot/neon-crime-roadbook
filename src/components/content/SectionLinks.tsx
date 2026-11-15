import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PRIMARY_NAV } from "@/config/navigation";

/** Internal links to the other public sections. */
export function SectionLinks({ exclude, heading = "Explore the guide" }: { exclude?: string; heading?: string }) {
  const items = PRIMARY_NAV.filter((item) => item.to !== exclude);
  return (
    <section aria-labelledby="section-links" className="container-site py-14">
      <h2 id="section-links" className="font-heading text-3xl sm:text-4xl">
        {heading}
      </h2>
      <ul className={`mt-6 grid gap-3 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="card-surface card-interactive group flex h-full flex-col gap-2 p-5"
            >
              <span className="flex items-center justify-between font-heading text-2xl">
                {item.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-neon-cyan"
                />
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">{item.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
