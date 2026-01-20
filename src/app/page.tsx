import {
  BarChart3,
  Blend,
  ChartNoAxesCombined,
  HeartHandshake,
  Layers3,
  Mail,
  MousePointerClick,
  Paintbrush,
  Sparkles,
  Stars,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { THEME_PRESETS, type ThemePresetId } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

const CREATOR_ROLES = [
  "musicians",
  "artists",
  "coaches",
  "streamers",
  "writers",
  "DJs",
  "founders",
  "podcasters",
  "photographers",
  "fitness creators",
  "shops",
  "community leads",
] as const;

export default async function Home() {
  const session = await auth();

  return (
    <div className="sundae-wrap min-h-screen">
      <header className="mx-auto max-w-6xl px-6 pt-10">
        <nav className="flex items-center justify-between gap-4">
          <a href="/" className="group inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl border bg-background/70 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Sundae</span>
          </a>

          <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="hover:text-foreground" href="#features">
              Features
            </a>
            <a className="hover:text-foreground" href="#flavors">
              Flavors
            </a>
            <a className="hover:text-foreground" href="#testimonials">
              Love
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
              <Button className="rounded-full">Get started</Button>
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <section className="relative pt-6">
          <div className="pointer-events-none absolute inset-x-0 -top-8 mx-auto h-[520px] max-w-6xl rounded-[48px] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-2xl" />

          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="space-y-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="sundae-chip">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Stars className="h-3.5 w-3.5" />
                  </span>
                  Link in bio
                </span>
                <span className="sundae-chip">Blocks</span>
                <span className="sundae-chip">Leads</span>
                <span className="sundae-chip">Clicks</span>
              </div>

              <h1 className="sundae-title text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
                Everything you make,
                <span className="block">
                  in
                  <span className="relative text-primary">
                    {" "}
                    one sweet link
                    <span className="absolute -bottom-1 left-0 h-[10px] w-full rounded-full bg-primary/20 blur-[1px]" />
                  </span>
                  .
                </span>
              </h1>

              <p className="sundae-subtitle max-w-xl text-base text-muted-foreground sm:text-lg">
                Build a creator homepage that matches your vibe: links, embeds,
                signup forms, and support buttons — with analytics that show
                what’s actually working.
              </p>

              <div className="grid gap-3 sm:max-w-xl sm:grid-cols-[1fr_auto] sm:items-center">
                <form action="/signin" className="relative">
                  <label className="sr-only" htmlFor="handle">
                    Choose a handle
                  </label>
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-foreground/55">
                    sundae.to/
                  </span>
                  <Input
                    id="handle"
                    name="handle"
                    placeholder="yourname"
                    className="h-12 rounded-full bg-background/70 pl-[108px] pr-4 shadow-sm backdrop-blur"
                    autoComplete="off"
                  />
                </form>
                <a href={session?.user?.email ? "/app/editor" : "/signin"}>
                  <Button className="h-12 w-full rounded-full px-7 sm:w-auto">
                    Get started
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={session?.user?.email ? "/app" : "/signin"}>
                  <Button className="h-11 rounded-full px-6">
                    Start building
                  </Button>
                </a>
                <a href="/demo">
                  <Button
                    variant="secondary"
                    className="h-11 rounded-full px-6"
                  >
                    View demo
                  </Button>
                </a>
              </div>

              <div className="grid gap-3 pt-2 sm:grid-cols-3">
                <Feature
                  icon={Layers3}
                  title="Blocks"
                  desc="Links, embeds, socials, forms."
                />
                <Feature
                  icon={MousePointerClick}
                  title="Click tracking"
                  desc="Know what’s working."
                />
                <Feature
                  icon={Mail}
                  title="Leads"
                  desc="Collect emails + DMs."
                />
              </div>
            </div>

            <div className="relative lg:pt-2">
              <div className="sundae-float pointer-events-none absolute -left-4 top-10 hidden h-10 w-28 rotate-[-8deg] rounded-3xl border bg-background/70 shadow-sm backdrop-blur md:block">
                <div className="flex h-full items-center justify-center gap-2 px-3 text-xs text-muted-foreground">
                  <Wand2 className="h-3.5 w-3.5 text-primary" />
                  Themes
                </div>
              </div>

              <div className="sundae-float sundae-float-fast pointer-events-none absolute -right-2 top-16 hidden h-10 w-36 rotate-[7deg] rounded-3xl border bg-background/70 shadow-sm backdrop-blur md:block">
                <div className="flex h-full items-center justify-center gap-2 px-3 text-xs text-muted-foreground">
                  <BarChart3 className="h-3.5 w-3.5 text-primary" />
                  Live clicks
                </div>
              </div>

              <div className="sundae-float pointer-events-none absolute -right-3 top-[52%] hidden h-10 w-40 rotate-[-5deg] rounded-3xl border bg-background/70 shadow-sm backdrop-blur md:block">
                <div className="flex h-full items-center justify-center gap-2 px-3 text-xs text-muted-foreground">
                  <HeartHandshake className="h-3.5 w-3.5 text-primary" />
                  Tip jar ready
                </div>
              </div>

              <div className="sundae-card relative overflow-hidden">
                <div className="relative border-b bg-background/55 p-5 backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-primary/15" />
                      <div className="space-y-1">
                        <div className="text-sm font-semibold tracking-tight">
                          Demo Creator
                        </div>
                        <div className="text-xs text-muted-foreground">
                          sundae.to/demo
                        </div>
                      </div>
                    </div>
                    <span className="sundae-chip">
                      <Sparkles className="h-3.5 w-3.5" />
                      Fresh
                    </span>
                  </div>
                </div>

                <div className="relative p-5">
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background/90 to-transparent" />

                  <div className="relative mx-auto max-w-[520px]">
                    <div className="sundae-phone-frame">
                      <Image
                        src="/brand/hero-sundae.png"
                        width={1100}
                        height={850}
                        priority
                        alt="A sundae served on a phone — Sundae creator page preview."
                        className="h-auto w-full"
                        sizes="(min-width: 1024px) 44vw, 92vw"
                      />
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <PreviewButton tone="strawberry">
                      Watch the latest video
                    </PreviewButton>
                    <PreviewButton tone="blueberry">
                      Join the newsletter
                    </PreviewButton>
                    <PreviewButton tone="mint">Tip jar</PreviewButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="sundae-card px-6 py-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm font-medium text-muted-foreground">
                As seen on{" "}
                <span className="text-xs text-muted-foreground/70">
                  (placeholder)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <PressLogo>Creator Daily</PressLogo>
                <PressLogo>Sweet Spot</PressLogo>
                <PressLogo>Pop Studio</PressLogo>
                <PressLogo>Indie Dispatch</PressLogo>
                <PressLogo>Midnight Mag</PressLogo>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="sundae-marquee">
            <div className="sundae-marquee-track">
              {CREATOR_ROLES.map((label) => (
                <span key={`role-1-${label}`} className="sundae-marquee-chip">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {label}
                </span>
              ))}
              {CREATOR_ROLES.map((label) => (
                <span key={`role-2-${label}`} className="sundae-marquee-chip">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mt-14">
          <div className="grid gap-5 md:grid-cols-3">
            <BigFeature
              icon={Paintbrush}
              title="Looks premium by default"
              desc="Sundae pages are fast, mobile-first, and genuinely fun to tap."
            />
            <BigFeature
              icon={Blend}
              title="Built for conversion"
              desc="Signup + contact blocks turn taps into subscribers and leads."
            />
            <BigFeature
              icon={ChartNoAxesCombined}
              title="Know what’s working"
              desc="Tracked clicks and analytics keep you focused on what converts."
            />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="sundae-card relative overflow-hidden p-7 sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute -left-24 top-[-120px] h-[280px] w-[280px] rounded-full bg-[oklch(0.92_0.09_250/50%)] blur-3xl" />
                <div className="absolute -right-24 bottom-[-120px] h-[280px] w-[280px] rounded-full bg-[oklch(0.94_0.08_12/50%)] blur-3xl" />
              </div>

              <div className="relative">
                <h2 className="text-3xl leading-tight sm:text-4xl">
                  Not just links — a tiny homepage.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                  Mix blocks like toppings: embeds, images, socials, a signup
                  form, and a tip jar. All in a layout that feels like you.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <MiniFeature icon={Layers3} title="Blocks" />
                  <MiniFeature icon={Mail} title="Signup" />
                  <MiniFeature icon={HeartHandshake} title="Support" />
                  <MiniFeature icon={MousePointerClick} title="Tracked links" />
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={session?.user?.email ? "/app/editor" : "/signin"}>
                    <Button className="h-11 rounded-full px-6">
                      Create yours
                    </Button>
                  </a>
                  <a href="/demo">
                    <Button
                      variant="secondary"
                      className="h-11 rounded-full px-6"
                    >
                      View demo
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="sundae-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold tracking-tight">
                      Built-in lead capture
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Collect emails or messages, then follow up in seconds.
                    </div>
                  </div>
                  <span className="sundae-chip">
                    <Mail className="h-3.5 w-3.5" />
                    Inbox
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Card className="gap-2 p-4">
                    <div className="text-sm font-medium">Signup</div>
                    <div className="text-xs text-muted-foreground">
                      newsletter / waitlist
                    </div>
                    <div className="mt-2 h-10 rounded-xl border bg-background/60" />
                  </Card>
                  <Card className="gap-2 p-4">
                    <div className="text-sm font-medium">Contact</div>
                    <div className="text-xs text-muted-foreground">
                      short message form
                    </div>
                    <div className="mt-2 h-10 rounded-xl border bg-background/60" />
                  </Card>
                </div>
              </div>

              <div className="sundae-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold tracking-tight">
                      Better decisions
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      See where clicks go so you can double down on what works.
                    </div>
                  </div>
                  <span className="sundae-chip">
                    <BarChart3 className="h-3.5 w-3.5" />
                    Analytics
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Metric label="Clicks" value="1,284" />
                  <Metric label="Top link" value="Video" />
                  <Metric label="Leads" value="67" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="flavors" className="mt-14">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl leading-tight sm:text-4xl">
                Pick a flavor. Ship your page.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Start with a curated look, then tweak colors and layout as you
                go. These presets are in the product today.
              </p>
            </div>
            <a href={session?.user?.email ? "/app/settings" : "/signin"}>
              <Button variant="secondary" className="h-11 rounded-full px-6">
                Explore themes
              </Button>
            </a>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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

        <section id="testimonials" className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl leading-tight sm:text-4xl">
                Loved by creators with taste.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Short feedback, big energy — from early Sundae beta creators.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <Testimonial
              name="Juno Park"
              handle="@junopark"
              quote="It feels like a mini-site, not a list. Took me five minutes to publish and it’s actually… cute?"
            />
            <Testimonial
              name="Maya Cruz"
              handle="@mayacruzzz"
              quote="The presets are fire. I used Mint Chip, swapped colors, and the page instantly matched my feed."
            />
            <Testimonial
              name="Ari Blake"
              handle="@ariblake"
              quote="Having signup + contact in the same place is clutch. My followers finally stopped DMing 'where do I join?'"
            />
          </div>
        </section>

        <section className="mt-14">
          <div className="sundae-card p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl leading-tight sm:text-4xl">
                  Make your bio link feel like a brand.
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  Your followers shouldn’t land on a bland list of links. Give
                  them a homepage that feels intentional — and measurable.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={session?.user?.email ? "/app/editor" : "/signin"}>
                  <Button className="h-11 rounded-full px-6">
                    Create yours
                  </Button>
                </a>
                <a href="/demo">
                  <Button
                    variant="secondary"
                    className="h-11 rounded-full px-6"
                  >
                    View demo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Sundae</span>
            <span>·</span>
            <span>Creator pages</span>
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

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Sparkles;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div className="text-sm font-semibold tracking-tight">{title}</div>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}

function BigFeature({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Sparkles;
  title: string;
  desc: string;
}) {
  return (
    <div className="sundae-card p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-3xl bg-primary/15 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div className="text-lg font-semibold tracking-tight">{title}</div>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}

function Swatch({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "h-7 w-7 rounded-2xl border shadow-[0_8px_18px_-10px_rgba(0,0,0,0.35)]",
        className,
      )}
      style={style}
    />
  );
}

function PreviewButton({
  tone,
  children,
}: {
  tone: "strawberry" | "mint" | "blueberry";
  children: string;
}) {
  const toneClass =
    tone === "strawberry"
      ? "from-[oklch(0.64_0.22_12)] to-[oklch(0.7_0.21_32)]"
      : tone === "mint"
        ? "from-[oklch(0.77_0.13_150)] to-[oklch(0.83_0.11_120)]"
        : "from-[oklch(0.7_0.14_250)] to-[oklch(0.64_0.12_280)]";

  return (
    <div className="group relative overflow-hidden rounded-3xl border bg-background/70 p-3 shadow-sm backdrop-blur">
      <div
        className={cn(
          "absolute inset-0 opacity-40",
          "bg-gradient-to-br",
          toneClass,
        )}
      />
      <div className="relative flex items-center justify-between gap-4 rounded-2xl bg-background/85 px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <div className="truncate text-sm font-semibold tracking-tight">
            {children}
          </div>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-2xl border bg-background/80">
          <MousePointerClick className="h-4 w-4 text-foreground/70" />
        </span>
      </div>
    </div>
  );
}

function PressLogo({ children }: { children: string }) {
  return (
    <span className="sundae-press-logo">
      <span className="sundae-press-dot" />
      {children}
    </span>
  );
}

function MiniFeature({
  icon: Icon,
  title,
}: {
  icon: typeof Sparkles;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border bg-background/70 px-4 py-3 shadow-sm backdrop-blur">
      <span className="grid h-10 w-10 place-items-center rounded-3xl bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="text-sm font-semibold tracking-tight">{title}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function ThemeCard({ presetId }: { presetId: ThemePresetId }) {
  const preset = THEME_PRESETS[presetId];
  const swatches: CSSProperties[] = [
    { background: preset.theme.buttonBackground },
    { background: preset.theme.accent },
    { background: preset.theme.text },
    { background: preset.theme.cardBackground },
  ];
  return (
    <div className="sundae-card overflow-hidden">
      <div
        className="relative h-28"
        style={{ background: preset.theme.background }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/35" />
      </div>
      <div className="p-5">
        <div className="text-sm font-semibold tracking-tight">
          {preset.name}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">preset theme</div>
        <div className="mt-4 flex items-center gap-2">
          {swatches.map((style) => (
            <Swatch key={style.background as string} style={style} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonial({
  name,
  handle,
  quote,
}: {
  name: string;
  handle: string;
  quote: string;
}) {
  return (
    <div className="sundae-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold tracking-tight">{name}</div>
          <div className="text-xs text-muted-foreground">{handle}</div>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <Stars className="h-4 w-4 fill-primary" />
          <Stars className="h-4 w-4 fill-primary" />
          <Stars className="h-4 w-4 fill-primary" />
          <Stars className="h-4 w-4 fill-primary" />
          <Stars className="h-4 w-4 fill-primary" />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{quote}</p>
    </div>
  );
}
