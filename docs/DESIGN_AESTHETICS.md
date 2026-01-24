# Design Aesthetics & Learnings (CLIQ → Sundae)

This is a working reference for the design direction we want Sundae to embody, based on a UI/UX teardown of `mycliq.vip` and a comparison to the current Sundae marketing UI.

The goal is not to copy layouts; it’s to copy *taste*: composition, restraint, and how the interface feels.

## High-level: why CLIQ feels “expensive”

CLIQ reads as art-directed rather than “well-styled” because it commits to a small number of strong decisions:

- **Framing:** content sits inside a centered container with subtle vertical rails. It feels like a printed page or magazine spread.
- **Tension:** big type + lots of negative space + a few moments of heavy contrast (light → dark sections).
- **Restraint:** limited palette and fewer simultaneous effects. The CTA is allowed to be the loudest thing.
- **Composition-first effects:** backgrounds and textures are positioned like part of the composition, not applied uniformly.

## Aesthetic primitives (steal these)

### 1) A “page” inside the browser

Use a strong page frame:

- max-width container (wide, but bounded)
- left/right rails (borders)
- background that feels like paper (warm off-white)
- sections that behave like designed panels inside that frame

Outcome: the site immediately stops feeling like a typical SaaS landing page.

### 2) A disciplined palette

CLIQ is basically:

- bone/stone background
- near-black and charcoal for ink
- a single warm accent (amber/orange)

The accent is rare, which makes it feel intentional.

### 3) Typography with contrast

CLIQ uses typography like layout:

- **Display serif** for “editorial gravity”
- **Sans** for system text and body copy
- **Mono / small-caps** for labels and navigation (system/terminal vibe)
- **Italic** as an emphasis tool (not decoration)
- aggressive tracking in big display moments

The contrast matters more than the exact font choice.

### 4) Section transitions that feel designed

CLIQ earns its scroll because sections feel like scenes:

- tonal shifts (light → dark)
- large background wordmarks / silhouettes
- vignettes and gradients that guide the eye

### 5) Texture that’s placed, not wallpapered

The “pixel grid” works when it’s:

- **scoped to a section/panel**, not full-page
- masked/vignetted (fades at edges)
- subtle (low contrast), so it reads as atmosphere
- layered under a strong focal element (type or silhouette)

## Where Sundae is currently missing the mark

These are the common “template energy” traps we should avoid:

- **Everything is soft and pleasant:** rounded pills + pastel gradients + subtle grid everywhere → no hierarchy.
- **Too many concurrent effects:** background texture + halftone + gradients + shadows all competing.
- **No hard framing:** without rails/frames, everything reads like a generic responsive layout.
- **CTA doesn’t win hard enough:** there isn’t a single moment where the design clearly says “this is the action”.

## Design rules for the next Sundae redesign

### Rule A: Pick a single story per section

Each section should have one primary message and one primary visual gesture:

- “Hero” = type + CTA + one atmosphere layer
- “Proof” = product preview + sparse captions
- “Close” = dark vignette scene + big wordmark + final CTA

### Rule B: Make the background compositional

No more global always-on effects. Backgrounds should:

- be scoped to sections
- be masked/vignetted
- support focal elements rather than provide entertainment

### Rule C: Reduce the number of shapes

One system:

- a page frame
- a card system
- one button style
- one accent

### Rule D: Embrace hard lines occasionally

Soft-only UI reads like a kit. Add:

- rails
- hairline separators
- deliberate “ink” areas (dark sections)

## Implementation notes (translation to components)

- **Frame component:** a reusable “page rails” wrapper that can be used on marketing and potentially creator pages later.
- **Section-local pixel scene:** implement a contained pixel-grid/canvas background with heavy vignette masking and very slow motion (or motion-off by default).
- **Typography utilities:** dedicated classes for display serif, italic emphasis, and mono labels.
- **CTA hierarchy:** one primary CTA style; everything else is secondary and quieter.

