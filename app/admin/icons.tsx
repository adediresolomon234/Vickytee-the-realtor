type IconProps = { className?: string };

const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function DashboardIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></svg>;
}

export function PropertiesIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M3 11 12 4l9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>;
}

export function GalleryIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="4" width="18" height="16" rx="1.8" /><circle cx="9" cy="10" r="2" /><path d="m4 18 5-5 4 4 3-3 4 4" /></svg>;
}

export function LeadsIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="5" width="18" height="14" rx="1.8" /><path d="m4 6.5 8 6 8-6" /></svg>;
}

export function BellIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" /><path d="M9.5 17a2.5 2.5 0 0 0 5 0" /></svg>;
}

export function UserIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></svg>;
}
