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
    <div className="min-h-screen">
      <main className="mx-auto grid min-h-screen max-w-5xl items-center gap-8 px-6 py-12 lg:grid-cols-2">
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
          <Card className="brand-card p-7 sm:p-8">
            <h2 className="brand-title text-xl leading-snug sm:text-2xl">
              A calmer canvas, with a little pixel magic.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Sundae helps your work stand out, then shows you what converts.
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
          </Card>
        </div>
      </main>
    </div>
  );
}

function ValueProp({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-black/10 bg-background/55 p-4 shadow-[0_18px_50px_-40px_oklch(0.17_0.02_265/35%)] backdrop-blur transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-44px_oklch(0.17_0.02_265/45%)]">
      <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-2xl bg-primary/20 text-foreground shadow-[inset_0_1px_0_oklch(1_0_0/50%)]">
        <Sparkles className="h-4 w-4" />
      </span>
      <div>
        <div className="text-sm font-semibold tracking-tight">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
