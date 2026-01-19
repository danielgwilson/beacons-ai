import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function Home() {
  const session = await auth();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Creator-only v1
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            One link. Your whole creator world.
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Build a fast, beautiful link-in-bio page with blocks, themes,
            analytics, and lead capture.
          </p>
          <div className="flex flex-wrap gap-3">
            {session?.user?.email ? (
              <a href="/app">
                <Button>Go to dashboard</Button>
              </a>
            ) : (
              <a href="/signin">
                <Button>Get started</Button>
              </a>
            )}
            <a href="/demo">
              <Button variant="secondary">View demo</Button>
            </a>
          </div>
        </div>

        <Card className="w-full max-w-md p-6">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">What you get</div>
            <ul className="space-y-2 text-sm">
              <li>• Block-based builder (links, embeds, text, forms)</li>
              <li>• Theme controls (colors + buttons)</li>
              <li>• Analytics: views + clicks</li>
              <li>• Email signups + contact form</li>
            </ul>
          </div>
        </Card>
      </div>
    </main>
  );
}
