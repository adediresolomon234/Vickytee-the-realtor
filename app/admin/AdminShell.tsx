"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BellIcon, DashboardIcon, GalleryIcon, LeadsIcon, PropertiesIcon, UserIcon } from "./icons";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon, exact: true },
  { href: "/admin/properties", label: "Properties", icon: PropertiesIcon, exact: false },
  { href: "/admin/buy", label: "Buy", icon: GalleryIcon, exact: false },
  { href: "/admin/sell", label: "Sell", icon: GalleryIcon, exact: false },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryIcon, exact: false },
  { href: "/admin/leads", label: "Leads", icon: LeadsIcon, exact: false },
];

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/properties": "Properties",
  "/admin/buy": "Buy",
  "/admin/sell": "Sell",
  "/admin/gallery": "Gallery",
  "/admin/leads": "Leads",
};

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const title = TITLES[pathname] || "Dashboard";

  return (
    <div className="admin-shell-v2">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar-brand">
          <Image src="/logo-gold.svg" alt="Vickytee the Realtor" width={170} height={51} />
        </Link>
        <nav className="admin-sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
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
