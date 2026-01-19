import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { clearE2EEmail, getAuthIdentity } from "@/lib/server/auth-identity";
import { cn } from "@/lib/utils";

function AppNav({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        <a href="/app" className="font-semibold tracking-tight">
          Creator Pages
        </a>
        <Separator orientation="vertical" className="h-5" />
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <a href="/app/editor" className="hover:text-foreground">
            Editor
          </a>
          <a href="/app/analytics" className="hover:text-foreground">
            Analytics
          </a>
          <a href="/app/leads" className="hover:text-foreground">
            Leads
          </a>
          <a href="/app/settings" className="hover:text-foreground">
            Settings
          </a>
        </div>
      </div>
      <form
        action={async () => {
          "use server";
          if (process.env.E2E === "1") {
            await clearE2EEmail();
            redirect("/");
          }
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit" variant="secondary">
          Sign out
        </Button>
      </form>
    </div>
  );
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const identity = await getAuthIdentity();
  if (!identity) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <AppNav />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
