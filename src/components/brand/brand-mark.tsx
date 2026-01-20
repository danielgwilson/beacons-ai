import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  title = "Sundae",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="sundaeMark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.9 0.22 145)" />
          <stop offset="0.55" stopColor="oklch(0.88 0.12 225)" />
          <stop offset="1" stopColor="oklch(0.7 0.21 330)" />
        </linearGradient>
        <filter id="markGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.65 0"
            result="faded"
          />
          <feMerge>
            <feMergeNode in="faded" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="9"
        fill="url(#sundaeMark)"
        filter="url(#markGlow)"
      />

      {/* Pixel cloud */}
      <g opacity="0.9" fill="oklch(0.16 0.02 265 / 85%)">
        <rect x="8" y="16" width="3" height="3" rx="0.6" />
        <rect x="11" y="14" width="3" height="3" rx="0.6" />
        <rect x="14" y="13" width="3" height="3" rx="0.6" />
        <rect x="17" y="14" width="3" height="3" rx="0.6" />
        <rect x="20" y="16" width="3" height="3" rx="0.6" />
        <rect x="11" y="17" width="3" height="3" rx="0.6" />
        <rect x="14" y="17" width="3" height="3" rx="0.6" />
        <rect x="17" y="17" width="3" height="3" rx="0.6" />
      </g>

      {/* Sparkle */}
      <path
        d="M23.2 9.3l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4z"
        fill="oklch(0.985 0.01 95)"
        opacity="0.92"
      />
    </svg>
  );
}
