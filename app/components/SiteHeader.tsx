import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return <header className={`site-header ${overlay ? "overlay" : "solid"}`}>
    <Link className="brand" href="/" aria-label="Vickytee the Realtor home"><Image src="/logo-gold.svg" alt="Vickytee the Realtor" width={270} height={82} priority /></Link>
    <nav aria-label="Primary navigation">
      <Link href="/homes">Homes</Link><Link href="/buy">Buy</Link><Link href="/sell">Sell</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
    </nav>
    <Link className="header-cta" href="/contact">Let’s talk</Link>
  </header>;
}
