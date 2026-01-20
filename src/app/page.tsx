import { auth } from "@/auth";
import { CreatorPage } from "@/components/creator/creator-page";
import { Button } from "@/components/ui/button";
import { DEMO_BLOCKS, DEMO_PROFILE } from "@/lib/demo";
import { THEME_PRESETS, type ThemePresetId } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

export default async function Home() {
  const session = await auth();

  return (
    <div className="sundae-wrap min-h-screen">
      <header className="mx-auto max-w-6xl px-6 pt-12">
        <nav className="flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border bg-background/70 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Sundae</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="hover:text-foreground" href="#features">
              Features
            </a>
            <a className="hover:text-foreground" href="#flavors">
              Themes
            </a>
            <a className="hover:text-foreground" href="#testimonials">
              Stories
            </a>
          </div>

          <div className="flex items-center gap-2">
            {session?.user?.email ? (
              <a href="/app">
                <Button variant="secondary" className="rounded-full">
                  Dashboard
                </Button>
              </a>
            ) : (
              <a href="/signin">
                <Button variant="secondary" className="rounded-full">
                  Sign in
                </Button>
              </a>
            )}
            <a href={session?.user?.email ? "/app/editor" : "/signin"}>
              <Button className="rounded-full">Start</Button>
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-14">
        <section className="grid items-start gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="max-w-xl space-y-8">
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.14_150)]" />
              <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.14_250)]" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              Link in bio, reimagined
            </p>

            <h1 className="sundae-title text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              A creator page that doesn’t look like a template.
            </h1>

            <p className="text-base text-muted-foreground sm:text-lg">
              Sundae is your link‑in‑bio, but with real personality: blocks,
              lead capture, and click analytics — without the “same page,
              different creator” vibe.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href={session?.user?.email ? "/app/editor" : "/signin"}>
                <Button className="h-11 rounded-full px-7">
                  Start building
                </Button>
              </a>
              <a href="/demo">
                <Button variant="secondary" className="h-11 rounded-full px-7">
                  View demo
                </Button>
              </a>
            </div>

            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              <Stat label="Blocks" value="8" />
              <Stat label="Leads" value="Built‑in" />
              <Stat label="Analytics" value="Clicks" />
            </div>
          </div>

          <div className="relative">
            <div className="sundae-phone-frame">
              <div className="sundae-embed">
                <div className="sundae-embed-scale">
                  <CreatorPage
                    profile={DEMO_PROFILE}
                    blocks={DEMO_BLOCKS}
                    linkMode="direct"
                    disableAnalytics
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              This is the real `/demo` page UI — not a mock.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="grid gap-6 rounded-3xl border bg-background/65 p-8 shadow-sm backdrop-blur sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  Built for solo creators today
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Clean path to teams and editors later.
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                No enterprise noise. Just ship.
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                eyebrow="01"
                title="Blocks, not bloat"
                desc="Links, embeds, socials, images, and forms — arranged like a tiny homepage."
                tone="vanilla"
              />
              <FeatureCard
                eyebrow="02"
                title="Leads built in"
                desc="Collect signup emails and contact messages, then follow up fast."
                tone="mint"
              />
              <FeatureCard
                eyebrow="03"
                title="Know what converts"
                desc="Tracked clicks + analytics so you stop guessing what your audience taps."
                tone="berry"
              />
            </div>
          </div>
        </section>

        <section id="features" className="mt-18">
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              <h2 className="text-3xl leading-tight sm:text-4xl">
                Your page should match your vibe.
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                Sundae is designed to feel like a brand, not a directory. Start
                with a theme, then customize it until it feels like you.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={session?.user?.email ? "/app/settings" : "/signin"}>
                  <Button className="h-11 rounded-full px-7">
                    Edit styles
                  </Button>
                </a>
                <a href="/demo">
                  <Button
                    variant="secondary"
                    className="h-11 rounded-full px-7"
                  >
                    See it live
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MiniPanel
                title="Signup + Contact"
                desc="Turn taps into conversations."
              />
              <MiniPanel title="Tracked links" desc="Every click counts." />
              <MiniPanel
                title="Fast publishing"
                desc="Mobile‑first and instant."
              />
              <MiniPanel title="Custom domain" desc="Bring your own later." />
            </div>
          </div>
        </section>

        <section id="flavors" className="mt-16">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl leading-tight sm:text-4xl">
                Themes that don’t feel generic.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Pick a flavor, publish, and iterate. These are in the product
                now.
              </p>
            </div>
            <a href={session?.user?.email ? "/app/settings" : "/signin"}>
              <Button variant="secondary" className="h-11 rounded-full px-7">
                Browse themes
              </Button>
            </a>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {(
              [
                "vanilla",
                "strawberry-night",
                "mint-chip",
                "blueberry-soda",
              ] as ThemePresetId[]
            ).map((presetId) => (
              <ThemeCard key={presetId} presetId={presetId} />
            ))}
          </div>
        </section>

        <section id="testimonials" className="mt-18">
          <div className="mt-16 rounded-3xl border bg-[oklch(0.18_0.03_265)] p-8 text-[oklch(0.985_0.015_85)] shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div>
                <h2 className="text-3xl leading-tight sm:text-4xl">
                  Less noise. More signal.
                </h2>
                <p className="mt-2 text-sm text-[oklch(0.86_0.02_85/85%)] sm:text-base">
                  A calmer canvas makes your work stand out. (Early beta quotes
                  — real ones soon.)
                </p>
              </div>
              <div className="grid gap-4">
                <Quote
                  name="Maya Cruz"
                  handle="@mayacruzzz"
                  quote="I swapped themes and it actually matched my feed. No more ‘default Link‑in‑bio’ energy."
                />
                <Quote
                  name="Ari Blake"
                  handle="@ariblake"
                  quote="Signup + contact on the same page saved me so many DMs. It feels like a real mini‑site."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="grid gap-6 rounded-3xl border bg-background/65 p-8 shadow-sm backdrop-blur sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl leading-tight sm:text-4xl">
                Make your bio link feel like a brand.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Start with Sundae, publish a real page, then iterate with data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={session?.user?.email ? "/app/editor" : "/signin"}>
                <Button className="h-11 rounded-full px-7">Start</Button>
              </a>
              <a href="/demo">
                <Button variant="secondary" className="h-11 rounded-full px-7">
                  View demo
                </Button>
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Sundae</span>
            <span>·</span>
            <span>sundae.to</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-foreground" href="/demo">
              Demo
            </a>
            <a className="hover:text-foreground" href="/signin">
              Sign in
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function FeatureCard({
  eyebrow,
  title,
  desc,
  tone,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  tone: "vanilla" | "mint" | "berry";
}) {
  const toneClass =
    tone === "mint"
      ? "bg-[oklch(0.93_0.05_140/55%)]"
      : tone === "berry"
        ? "bg-[oklch(0.9_0.05_250/55%)]"
        : "bg-[oklch(0.99_0.01_85/55%)]";

  return (
    <div
      className={cn(
        "rounded-3xl border p-6 shadow-sm",
        "bg-background/55 backdrop-blur",
        "relative overflow-hidden",
      )}
    >
      <div className={cn("absolute inset-0 opacity-80", toneClass)} />
      <div className="relative">
        <div className="text-xs font-semibold tracking-[0.22em] text-foreground/60">
          {eyebrow}
        </div>
        <div className="mt-3 text-lg font-semibold tracking-tight">{title}</div>
        <div className="mt-2 text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function MiniPanel({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}

function ThemeCard({ presetId }: { presetId: ThemePresetId }) {
  const preset = THEME_PRESETS[presetId];

  return (
    <div className="rounded-3xl border bg-background/60 shadow-sm backdrop-blur">
      <div
        className="h-28 rounded-t-3xl"
        style={{ background: preset.theme.background }}
      />
      <div className="p-5">
        <div className="text-sm font-semibold tracking-tight">
          {preset.name}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">preset theme</div>
      </div>
    </div>
  );
}

function Quote({
  name,
  handle,
  quote,
}: {
  name: string;
  handle: string;
  quote: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold tracking-tight">{name}</div>
      <div className="text-xs text-[oklch(0.86_0.02_85/75%)]">{handle}</div>
      <p className="mt-4 text-sm text-[oklch(0.86_0.02_85/85%)]">{quote}</p>
    </div>
  );
}
