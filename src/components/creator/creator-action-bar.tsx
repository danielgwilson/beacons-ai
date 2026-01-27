"use client";

import { BarChart3, Pencil, Share2 } from "lucide-react";
import { useState } from "react";

interface CreatorActionBarProps {
  handle: string;
}

export function CreatorActionBar({ handle }: CreatorActionBarProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/${handle}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="creator-action-bar fixed bottom-6 left-1/2 z-50 flex items-center gap-1 rounded-full border border-[color-mix(in_oklab,var(--creator-text)_14%,transparent)] bg-[color-mix(in_oklab,var(--creator-card)_85%,transparent)] px-2 py-2 shadow-[0_20px_60px_-30px_color-mix(in_oklab,var(--creator-text)_45%,transparent)] backdrop-blur-xl">
      <a
        href="/app/editor"
        className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--creator-text)] transition-colors duration-200 hover:bg-[var(--creator-accent)]/15"
      >
        <Pencil className="h-4 w-4" />
        <span className="hidden sm:inline">Edit</span>
      </a>

      <button
        type="button"
        onClick={handleShare}
        className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--creator-text)] transition-colors duration-200 hover:bg-[var(--creator-accent)]/15"
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
      </button>

      <a
        href="/app/analytics"
        className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--creator-text)] transition-colors duration-200 hover:bg-[var(--creator-accent)]/15"
      >
        <BarChart3 className="h-4 w-4" />
        <span className="hidden sm:inline">Analytics</span>
      </a>
    </div>
  );
}
