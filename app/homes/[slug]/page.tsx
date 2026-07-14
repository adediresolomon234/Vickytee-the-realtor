import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { homes } from "../../../lib/homes";
import { GuidedTour } from "./GuidedTour";

export function generateStaticParams() { return homes.map(({ slug }) => ({ slug })); }
export default async function HomeProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const home = homes.find((item) => item.slug === slug); if (!home) notFound();
  return <main><SiteHeader /><section className="profile-hero"><img src={home.image} alt={home.name} /><div className="profile-hero-shade" /><div><p className="eyebrow light">{home.type} · {home.setting}</p><h1>{home.name}</h1><p>{home.summary}</p></div></section><section className="profile-overview"><div className="profile-stats"><div><span>Bedrooms</span><strong>{home.beds}</strong></div><div><span>Bathrooms</span><strong>{home.baths}</strong></div><div><span>Typical size</span><strong>{home.size}</strong></div><div><span>Market segment</span><strong>{home.segment}</strong></div></div><GuidedTour name={home.name} images={home.gallery} features={home.features} /><div className="profile-story"><div><p className="eyebrow">The profile</p><h2>Could this be your kind of home?</h2><p>{home.summary} Victoria can turn the qualities you like here into a tailored search using current market inventory.</p><h3>What Victoria helps you evaluate</h3><ul>{home.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><Link className="button button-dark" href={`/contact?interest=${encodeURIComponent(home.name)}`}>Ask about this style</Link></div><div className="profile-gallery">{home.gallery.slice(1).map((image,index) => <img src={image} alt={`${home.name} inspiration ${index + 2}`} key={image} loading="lazy" />)}</div></div><p className="profile-disclaimer">Inspiration photography and ranges are illustrative, not active listings or guarantees of availability or price. Victoria can provide current options for your chosen area.</p></section><section className="next-profile"><Link href="/homes">← Back to all home styles</Link><Link href="/contact">Start a live search →</Link></section><SiteFooter /></main>;
}
