# PRD v1 (Creator-only)

This doc translates `docs/RESEARCH.md` into an implementable v1 scope for individual creators.

## Target user

An individual creator who wants:

- A single “link in bio” page that looks good on mobile
- Simple customization (theme + blocks)
- Basic monetization links (shop, tips)
- Lead capture (email/contact form)
- Analytics (views + clicks)

## Non-goals (v1)

- Organizations/teams, multiple editors, complex permissions UI
- Built-in email campaigns/automations
- Built-in checkout + digital fulfillment
- Deep social integrations that require lots of API keys

## Required surfaces (v1)

### Public

- `/{handle}`: public creator page
- `/r/{blockId}`: tracked redirect for link clicks
- `/api/analytics/view`: record page views
- `/api/leads`: lead capture endpoint (email/contact forms)

### Authenticated app

- `/signin`: sign-in page (Google OAuth)
- `/app`: dashboard (quick links + preview)
- `/app/onboarding`: choose handle + initial profile setup
- `/app/editor`: block editor + live preview
- `/app/analytics`: charts + top links
- `/app/settings`: profile + theme + domain (scaffold)
- `/app/leads`: view collected leads

## Block types (v1)

V1 ships with these blocks:

- `link`: title + url + optional subtitle
- `text`: title + markdown body
- `image`: image URL + alt + optional link
- `embed`: supported providers (YouTube/Vimeo) by URL
- `social`: platform + url (render icon row)
- `support`: label + external URL (PayPal/Ko-fi/etc.)
- `signup`: headline + optional “lead magnet” URL + email collection
- `contact`: name/email/message

Blocks support:

- Enable/disable
- Reorder
- Delete

## Analytics (v1)

- View event: per-handle + per-day
- Click event: per-block + per-day + top destinations
- Minimal privacy: store a one-way IP hash (salted) and user agent + referrer for debugging

## Future-proofing (teams/roles)

Data model uses `workspaces` and `workspace_members`:

- v1: each user has one personal workspace; one profile
- v2+: add managers/editors via `workspace_members.role`

