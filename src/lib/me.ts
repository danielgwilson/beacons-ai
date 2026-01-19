import { redirect } from "next/navigation";
import { ensureUserProvisioned } from "@/lib/provisioning";
import { getAuthIdentity } from "@/lib/server/auth-identity";

export async function getMyWorkspaceAndProfile() {
  const identity = await getAuthIdentity();
  if (!identity) {
    redirect("/signin");
  }

  return ensureUserProvisioned({
    email: identity.email,
    name: identity.name,
    image: identity.image,
  });
}
