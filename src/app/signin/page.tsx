import { Sparkles } from "lucide-react";
import { signIn } from "@/auth";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SignInPage() {
  const googleConfigured = Boolean(
    process.env.AUTH_GOOGLE_ID &&
      process.env.AUTH_GOOGLE_SECRET &&
      process.env.AUTH_SECRET,
  );

  return (
    <div className="marketing min-h-[100svh]">
      <div className="brand-frame min-h-[100svh]">
        <main className="grid min-h-[100svh] items-start gap-8 px-6 py-10 lg:min-h-screen lg:grid-cols-2 lg:items-center lg:px-8 lg:py-14">
          <aside className="order-2 lg:order-1">
            <Card className="brand-card p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <BrandMark className="h-9 w-9" />
                  <div className="leading-tight">
                    <div className="text-sm font-semibold tracking-tight">
                      Sundae
                    </div>
                    <div className="text-xs text-muted-foreground">
                      creator studio
                    </div>
                  </div>
                </div>
                <div className="brand-chip hidden sm:inline-flex">
                  <Sparkles className="h-3.5 w-3.5 text-foreground/70" />
                  clean, fast, conversion‑first
                </div>
              </div>

              <h1 className="brand-title mt-6 text-3xl leading-tight sm:text-4xl">
                Sign in. Ship updates. Get taps that matter.
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Build your page, track clicks, and collect leads — all in one
                place.
              </p>

              {!googleConfigured ? (
                <div className="mt-5 rounded-2xl border border-black/10 bg-background/60 p-4 text-sm text-muted-foreground backdrop-blur">
                  Google auth isn’t configured. Set{" "}
                  <span className="brand-mono">AUTH_SECRET</span>,{" "}
                  <span className="brand-mono">AUTH_GOOGLE_ID</span>, and{" "}
                  <span className="brand-mono">AUTH_GOOGLE_SECRET</span>.
                </div>
              ) : null}

              <form
                className="mt-6"
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/app" });
                }}
              >
                <Button
                  type="submit"
                  className="h-11 w-full rounded-full"
                  disabled={!googleConfigured}
                >
                  Continue with Google
                </Button>
              </form>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <a className="hover:text-foreground" href="/">
                  ← Back home
                </a>
                <a className="hover:text-foreground" href="/demo">
                  View a demo page
                </a>
              </div>
            </Card>
          </aside>

          <div className="order-1 lg:order-2">
            <div className="brand-ink-panel">
              <div className="absolute inset-0 brand-matrix opacity-[0.85]" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute -bottom-16 left-1/2 w-full -translate-x-1/2 text-center">
                <div className="brand-wordmark text-[clamp(5rem,16vw,16rem)] italic text-white/10">
                  Sundae
                </div>
              </div>

              <div className="relative p-7 sm:p-8">
                <div className="brand-mono text-[11px] uppercase tracking-[0.24em] text-white/65">
                  Creator studio
                </div>
                <h2 className="brand-title mt-3 text-2xl leading-snug text-white sm:text-3xl">
                  A calmer canvas — with a little{" "}
                  <span className="italic text-primary">pixel magic</span>.
                </h2>
                <p className="mt-2 text-sm text-white/70 sm:text-base">
                  Sundae helps your work stand out, then shows you what
                  converts.
                </p>

                <div className="mt-6 grid gap-3 text-sm">
                  <ValueProp
                    title="Premium defaults"
                    desc="Typography + spacing that doesn’t look like everyone else."
                  />
                  <ValueProp
                    title="Built‑in leads"
                    desc="Signup emails and contact messages, stored and ready."
                  />
                  <ValueProp
                    title="Click analytics"
                    desc="Track taps without changing your links."
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ValueProp({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_80px_-70px_oklch(0_0_0/85%)] backdrop-blur transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:bg-white/7">
      <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-2xl bg-white/10 text-white shadow-[inset_0_1px_0_oklch(1_0_0/20%)]">
        <Sparkles className="h-4 w-4 text-primary" />
      </span>
      <div>
        <div className="text-sm font-semibold tracking-tight text-white">
          {title}
        </div>
        <div className="mt-1 text-sm text-white/70">{desc}</div>
      </div>
    </div>
  );
}
