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
      <nav className="footer-links" aria-label="Footer navigation"><Link href="/homes">Homes</Link><Link href="/buy">Buy</Link><Link href="/sell">Sell</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms</Link></nav>
      <div className="footer-social"><a href="https://www.instagram.com/vickyteetherealtor" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a><a href="https://www.tiktok.com/@vickyteetherealtor" target="_blank" rel="noreferrer" aria-label="TikTok">TK</a></div>
    </div>
    <div className="footer-compliance">
      <address><strong>VICKYTEETHEREALTOR INC</strong><br />3612 WORDSWORTH RD<br />MCKINNEY, TX 75071</address>
      <nav className="footer-disclosures" aria-label="Texas real estate disclosures">
        <a href="https://www.trec.texas.gov/sites/default/files/pdf-forms/CN%201-5.pdf" target="_blank" rel="noreferrer">Texas Real Estate Commission Consumer Protection Notice</a>
        <a href="https://dtzulyujzhqiu.cloudfront.net/expcorporate377/compliance/tx/user/377_971092_iabs.pdf" target="_blank" rel="noreferrer">Texas Real Estate Commission Information About Brokerage Services (IABS)</a>
      </nav>
    </div>
    <div className="footer-legal"><p>© {new Date().getFullYear()} VICKYTEETHEREALTOR INC. All rights reserved.</p><p>REALTOR® is a registered trademark of the National Association of REALTORS®. Information is deemed reliable but not guaranteed. Equal Housing Opportunity.</p></div>
  </footer>;
}
