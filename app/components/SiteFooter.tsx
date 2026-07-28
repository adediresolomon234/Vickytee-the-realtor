import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return <footer>
    <div className="footer-main">
      <Image src="/logo-gold.svg" alt="Vickytee the Realtor" width={260} height={78} />
      <div className="footer-brokerage">
        <p>Victoria Olorede, REALTOR®<br />Brokered by eXp Realty</p>
        <Image src="/equal-housing-white.png" alt="Equal Housing Opportunity" width={40} height={42} className="footer-equal-housing" unoptimized />
      </div>
      <div className="footer-links"><Link href="/homes">Homes</Link><Link href="/buy">Buy</Link><Link href="/sell">Sell</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
      <div className="footer-social"><a href="https://www.instagram.com/vickyteetherealtor" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a><a href="https://www.tiktok.com/@vickyteetherealtor" target="_blank" rel="noreferrer" aria-label="TikTok">TK</a></div>
    </div>
    <div className="footer-legal"><p>© {new Date().getFullYear()} Vickytee the Realtor. All rights reserved.</p><p>REALTOR® is a registered trademark of the National Association of REALTORS®. Information is deemed reliable but not guaranteed. Equal Housing Opportunity.</p></div>
  </footer>;
}
