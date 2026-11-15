import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { PRIMARY_NAV } from "@/config/navigation";

import { Wordmark } from "./Wordmark";

const linkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass} activeProps={{ "aria-current": "page" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main mobile"
        className={open ? "border-t border-border md:hidden" : "hidden"}
      >
        <ul className="container-site grid gap-1 py-3">
          {PRIMARY_NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex flex-col rounded-md px-3 py-3 transition-colors hover:bg-accent data-[status=active]:bg-accent"
              >
                <span className="font-heading text-2xl">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div aria-hidden="true" className="hairline-neon opacity-30" />
    </header>
  );
}
