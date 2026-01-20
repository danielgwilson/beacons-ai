import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SignInPage() {
  const googleConfigured = Boolean(
    process.env.AUTH_GOOGLE_ID &&
      process.env.AUTH_GOOGLE_SECRET &&
      process.env.AUTH_SECRET,
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-12">
      <Card className="w-full p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage your creator page.
          </p>
          {!googleConfigured ? (
            <p className="text-sm text-muted-foreground">
              Google auth isn’t configured. Set{" "}
              <span className="font-mono">AUTH_SECRET</span>,{" "}
              <span className="font-mono">AUTH_GOOGLE_ID</span>, and{" "}
              <span className="font-mono">AUTH_GOOGLE_SECRET</span>.
            </p>
          ) : null}
        </div>

        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/app" });
          }}
        >
          <Button type="submit" className="w-full" disabled={!googleConfigured}>
            Continue with Google
          </Button>
        </form>
      </Card>
    </main>
  );
}
