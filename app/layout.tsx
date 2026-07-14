import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("host") || "localhost:3003";
  const protocol = incoming.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: "Vickytee the Realtor | Victoria Olorede, REALTOR®",
    description: "Thoughtful real estate guidance for Texas buyers, sellers, and investors with Victoria Olorede of eXp Realty.",
    icons: { icon: "/logo-gold.svg", shortcut: "/logo-gold.svg" },
    openGraph: { title: "Vickytee the Realtor", description: "Find the place that feels like yours.", type: "website", images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Vickytee the Realtor" }] },
    twitter: { card: "summary_large_image", title: "Vickytee the Realtor", description: "Find the place that feels like yours.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
