import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const dynamic = "force-dynamic";

export default async function SellPage() {
  return (
    <main>
      <SiteHeader />
      <section className="interior-hero sell-hero">
        <div><p className="eyebrow light">Sell with Victoria</p><h1>Make your move<br /><em>with intention.</em></h1><p>Preparation, positioning, and responsive representation from the first conversation through the closing table.</p></div>
      </section>
      <section className="seller-value"><div><p className="eyebrow">Your selling strategy</p><h2>More than putting a sign in the yard.</h2><p>Your home's strongest launch comes from making the right decisions before it reaches the market. Victoria coordinates the details around your goals, condition, competition, and timing.</p><Link className="button button-dark" href="/contact">Request a consultation</Link></div><div className="seller-card"><span>01</span><h3>Pricing intelligence</h3><p>A market-informed range based on comparable sales, competition, condition, and buyer behavior.</p></div><div className="seller-card"><span>02</span><h3>Presentation plan</h3><p>Prioritized preparation and marketing choices designed to protect your time and improve impact.</p></div><div className="seller-card"><span>03</span><h3>Offer strategy</h3><p>Careful comparison of price, financing, timing, concessions, risk, and likelihood of closing.</p></div></section>
      <section className="valuation-banner"><p className="eyebrow light">Thinking about selling?</p><h2>Start with a realistic conversation about value.</h2><p>Online estimates miss the condition, improvements, setting, and competition that shape your real position.</p><Link className="button button-gold" href="/contact">Discuss my home</Link></section>
      <SiteFooter />
    </main>
  );
}
