"use client";

import { useEffect } from "react";

export function CreatorAnalyticsBeacon({ handle }: { handle: string }) {
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/analytics/view", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ handle }),
      signal: controller.signal,
      keepalive: true,
    }).catch(() => {});
    return () => controller.abort();
  }, [handle]);

  return null;
}
