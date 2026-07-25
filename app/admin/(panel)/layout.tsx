import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getBackendAdminMe, getBackendListingLabels } from "../../../lib/backend";
import { displayListingLabel } from "../../../lib/listing-label";
import { AdminShell } from "../AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  let listingLabels: string[] = [];
  try {
    await getBackendAdminMe();
  } catch {
    redirect("/admin/login");
  }
  try {
    const labels = await getBackendListingLabels();
    const labelMap = new Map<string, string>();
    for (const label of labels) {
      const display = displayListingLabel(label.name);
      if (display) labelMap.set(display.toLowerCase(), display);
    }
    listingLabels = Array.from(labelMap.values()).sort((a, b) => a.localeCompare(b));
  } catch {
    // The sidebar can still render its fixed links while the backend starts locally.
  }
  return <AdminShell listingLabels={listingLabels}>{children}</AdminShell>;
}
