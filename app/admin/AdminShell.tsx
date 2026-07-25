"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { BellIcon, DashboardIcon, PropertiesIcon, UserIcon } from "./icons";

const FIXED_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon, exact: true },
  { href: "/admin/properties", label: "Properties", icon: PropertiesIcon, exact: true },
];

const MAX_VISIBLE_LABELS = 10;

function labelHref(label: string) {
  return `/admin/properties?label=${encodeURIComponent(label)}`;
}

function uniqueLabels(labels: string[]) {
  const labelMap = new Map<string, string>();
  for (const label of labels) {
    const clean = label.trim();
    if (clean) labelMap.set(clean.toLowerCase(), clean);
  }
  return Array.from(labelMap.values()).sort((a, b) => a.localeCompare(b));
}

export function AdminShell({ children, listingLabels = [], apiBaseUrl }: { children: ReactNode; listingLabels?: string[]; apiBaseUrl: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeLabel = searchParams.get("label") || "";
  const [labels, setLabels] = useState(() => uniqueLabels(listingLabels));
  const [labelName, setLabelName] = useState("");
  const [labelStatus, setLabelStatus] = useState("");
  const visibleLabels = labels.slice(0, MAX_VISIBLE_LABELS);
  const hiddenLabels = labels.slice(MAX_VISIBLE_LABELS);
  const title = pathname === "/admin/properties" && activeLabel ? activeLabel : pathname === "/admin/properties" ? "Properties" : "Dashboard";

  async function createLabel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = labelName.trim();
    if (!name) return;
    setLabelStatus("Adding...");
    const response = await fetch(`${apiBaseUrl}/api/admin/listing-labels`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await response.json() as { name?: string; error?: string };
    if (!response.ok || !data.name) {
      setLabelStatus(data.error || "Could not add label.");
      return;
    }
    setLabels((current) => {
      const next = current.filter((label) => label.toLowerCase() !== data.name!.toLowerCase());
      return uniqueLabels([...next, data.name!]);
    });
    setLabelName("");
    setLabelStatus("");
    router.refresh();
  }

  return (
    <div className="admin-shell-v2">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar-brand">
          <Image src="/logo-gold.svg" alt="Vickytee the Realtor" width={170} height={51} />
        </Link>
        <nav className="admin-sidebar-nav">
          {FIXED_NAV_ITEMS.map((item) => {
            const active = item.exact ? pathname === item.href && !activeLabel : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <form className="admin-sidebar-label-form" onSubmit={createLabel}>
            <input value={labelName} onChange={(event) => setLabelName(event.target.value)} placeholder="Add label" aria-label="Add listing label" />
            <button type="submit">Add</button>
            {labelStatus ? <small>{labelStatus}</small> : null}
          </form>
          {visibleLabels.map((label) => (
            <Link key={label} href={labelHref(label)} className={pathname === "/admin/properties" && activeLabel === label ? "active" : ""}>
              <PropertiesIcon />
              <span>{label}</span>
            </Link>
          ))}
          {hiddenLabels.length ? (
            <details className="admin-sidebar-more" open={hiddenLabels.includes(activeLabel) ? true : undefined}>
              <summary>More</summary>
              <div>
                {hiddenLabels.map((label) => (
                  <Link key={label} href={labelHref(label)} className={pathname === "/admin/properties" && activeLabel === label ? "active" : ""}>
                    <PropertiesIcon />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </details>
          ) : null}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-title"><DashboardIcon /><h1>{title}</h1></div>
          <div className="admin-topbar-actions">
            <BellIcon />
            <div className="admin-user-name"><strong>Victoria</strong><span>Administrator</span></div>
            <span className="admin-user-avatar"><UserIcon /></span>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
