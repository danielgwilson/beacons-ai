const RESERVED_HANDLES = new Set([
  "api",
  "app",
  "signin",
  "signout",
  "auth",
  "r",
  "e2e",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export type HandleValidationResult =
  | { ok: true; normalized: string }
  | { ok: false; reason: string };

export function normalizeHandle(input: string): string {
  return input.trim().toLowerCase();
}

export function validateHandle(input: string): HandleValidationResult {
  const normalized = normalizeHandle(input);

  if (!normalized) {
    return { ok: false, reason: "Handle is required." };
  }
  if (normalized.length < 3) {
    return { ok: false, reason: "Handle must be at least 3 characters." };
  }
  if (normalized.length > 30) {
    return { ok: false, reason: "Handle must be 30 characters or fewer." };
  }
  if (RESERVED_HANDLES.has(normalized)) {
    return { ok: false, reason: "That handle is reserved." };
  }
  if (!/^[a-z0-9][a-z0-9_-]*$/.test(normalized)) {
    return {
      ok: false,
      reason:
        "Use only letters, numbers, '_' and '-', starting with a letter or number.",
    };
  }
  if (/[_-]{2,}/.test(normalized)) {
    return { ok: false, reason: "Avoid repeated '-' or '_' characters." };
  }
  if (normalized.endsWith("-") || normalized.endsWith("_")) {
    return { ok: false, reason: "Handle cannot end with '-' or '_'." };
  }

  return { ok: true, normalized };
}

export function deriveHandleFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const simplified = local
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-_]+/, "")
    .replace(/[-_]+$/, "");

  const candidate = simplified.slice(0, 30);
  const validated = validateHandle(candidate);
  if (validated.ok) return validated.normalized;

  return `user-${Math.random().toString(36).slice(2, 8)}`;
}
