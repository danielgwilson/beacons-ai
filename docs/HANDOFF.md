# Handoff (beacons-ai)

## Current state

- Core creator-only v1 is wired end-to-end:
  - Auth: Google OAuth via NextAuth (`src/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`)
  - DB: Drizzle schema + migrations (`src/lib/db/schema.ts`, `src/lib/db/drizzle/`)
  - Public pages: `/{handle}` renders blocks and tracks views/clicks
  - App: `/app/*` pages for editor, analytics, leads, settings
- First sign-in provisions:
  - `users` row, a personal `workspace`, `workspace_members` owner membership, and a `creator_profile`
  - A few starter blocks (link + social; signup disabled)

## Open questions

- Email sending: do we want Resend/Postmark/etc for lead confirmations + lead magnet delivery?
- Custom domains: implement verification + host-based routing (Vercel domains + edge-safe mapping).
- Payments: do we want Stripe in v1.5 (checkout + products) or keep “link-out store” in v1?
