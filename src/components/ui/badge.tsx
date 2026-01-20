import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "relative inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold tracking-tight",
    "overflow-hidden",
    "transition-[transform,background-color,color,border-color,box-shadow] duration-200",
    "[&_svg]:pointer-events-none [&_svg]:size-3",
    "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/25 aria-invalid:border-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-black/10 bg-primary text-primary-foreground [a&]:hover:-translate-y-0.5 [a&]:hover:shadow-sm",
        secondary:
          "border-black/10 bg-secondary text-secondary-foreground [a&]:hover:-translate-y-0.5 [a&]:hover:shadow-sm",
        destructive:
          "border-black/10 bg-destructive text-white [a&]:hover:-translate-y-0.5 [a&]:hover:shadow-sm focus-visible:ring-destructive/35",
        outline:
          "bg-background/50 text-foreground [a&]:hover:-translate-y-0.5 [a&]:hover:bg-background/70 [a&]:hover:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
