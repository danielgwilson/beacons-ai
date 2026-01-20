import type * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        [
          "flex field-sizing-content w-full min-w-0",
          "min-h-28 resize-y rounded-2xl border border-black/10 bg-background/60 px-4 py-3 text-sm text-foreground",
          "placeholder:text-muted-foreground",
          "shadow-[inset_0_1px_0_oklch(1_0_0/35%),0_10px_28px_-26px_oklch(0.17_0.02_265/35%)]",
          "backdrop-blur",
          "transition-[border-color,box-shadow,background-color] duration-200",
          "outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] focus-visible:bg-background/75",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:ring-destructive/25 aria-invalid:border-destructive",
          "selection:bg-primary selection:text-primary-foreground",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
