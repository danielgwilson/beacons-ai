import { notFound, redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setE2EEmail } from "@/lib/server/auth-identity";

export default function E2ELoginPage() {
  if (process.env.E2E !== "1") {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-12">
      <Card className="w-full p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">E2E Login</h1>
          <p className="text-sm text-muted-foreground">
            Sets an E2E-only auth cookie for Playwright.
          </p>
        </div>

        <form
          className="mt-6 grid gap-4"
          action={async (formData) => {
            "use server";
            const email = String(formData.get("email") ?? "").trim();
            if (!email) return;
            await setE2EEmail(email);
            redirect("/app");
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue="e2e@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Card>
    </main>
  );
}
