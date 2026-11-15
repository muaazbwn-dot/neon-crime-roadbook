import { cva } from "class-variance-authority";

import { STATUS_META, type ContentStatus } from "@/content/status";
import { cn } from "@/lib/utils";

const statusBadge = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] whitespace-nowrap",
  {
    variants: {
      status: {
        official: "border-status-official/35 bg-status-official/10 text-status-official",
        verified: "border-status-verified/35 bg-status-verified/10 text-status-verified",
        reported: "border-status-reported/35 bg-status-reported/10 text-status-reported",
        speculation: "border-status-speculation/35 bg-status-speculation/10 text-status-speculation",
        undiscovered: "border-status-undiscovered/35 bg-status-undiscovered/10 text-status-undiscovered",
      },
    },
  },
);

const dot = cva("size-1.5 rounded-full", {
  variants: {
    status: {
      official: "bg-status-official",
      verified: "bg-status-verified",
      reported: "bg-status-reported",
      speculation: "bg-status-speculation",
      undiscovered: "bg-status-undiscovered",
    },
  },
});

export function StatusBadge({ status, className }: { status: ContentStatus; className?: string }) {
  return (
    <span className={cn(statusBadge({ status }), className)} title={STATUS_META[status].description}>
      <span aria-hidden="true" className={dot({ status })} />
      {STATUS_META[status].label}
    </span>
  );
}
