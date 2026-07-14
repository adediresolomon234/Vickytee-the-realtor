import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./components/ContactForm";
import { HomeSearch } from "./components/HomeSearch";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { getPublishedMedia, type MediaItem } from "../lib/storage";

const collections = [
  {
    name: "Modern Living",
    note: "Clean lines · effortless comfort",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Elevated Estates",
    note: "Space, privacy · lasting value",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "City Sophistication",
    note: "Connected · curated · convenient",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  },
];

async function SocialMedia() {
  let items: MediaItem[] = [];
  try {
    items = await getPublishedMedia();
  } catch {
    // The local preview can render before hosted storage is attached.
  }

  return (
    <section className="social-section" id="social">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">The social edit</p>
          <h2>Real estate, in real time.</h2>
        </div>
        <a className="text-link" href="https://www.instagram.com/vickyteetherealtor" target="_blank" rel="noreferrer">
          Follow @vickyteetherealtor <span aria-hidden="true">↗</span>
        </a>
      </div>

      {items.length ? (
        <div className="media-grid">
          {items.map((item) => (
            <article className="media-card" key={item.id}>
              {item.kind === "instagram" ? (
                <iframe
                  src={`${item.url.replace(/\/$/, "")}/embed`}
                  title={item.title}
                  loading="lazy"
                  allow="encrypted-media"
                />
              ) : (
                <video controls preload="metadata" playsInline poster={item.posterUrl || undefined}>
                  <source src={item.url} />
                  Your browser does not support video playback.
                </video>
              )}
              <div className="media-copy">
                <p>{item.title}</p>
                {item.caption && <span>{item.caption}</span>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="social-empty">
          <div className="reel-placeholder" aria-hidden="true"><span>▶</span></div>
          <div>
            <p className="eyebrow">Fresh updates coming soon</p>
            <h3>Tours, market notes, and honest real estate conversations.</h3>
            <p>Victoria’s newest videos will appear here. In the meantime, join the conversation on Instagram.</p>
            <a className="button button-gold" href="https://www.instagram.com/vickyteetherealtor" target="_blank" rel="noreferrer">Visit Instagram</a>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <SiteHeader overlay />

      <section className="hero" id="top">
        <div className="hero-image" role="img" aria-label="Modern luxury home at dusk" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">U.S. real estate · Elevated service</p>
          <h1>Find the place<br />that feels like <em>yours.</em></h1>
          <p className="hero-intro">Confident guidance for buyers, sellers, and investors—delivered with care, clarity, and a sharp eye for opportunity.</p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/homes">Explore homes</Link>
            <Link className="button button-ghost" href="/sell">Sell with Victoria</Link>
          </div>
        </div>
        <div className="hero-signature">
          <span>Victoria Olorede</span>
          <small>REALTOR® · eXp Realty</small>
        </div>
      </section>

      <section className="search-wrap" id="buy">
        <div className="search-intro">
          <p className="eyebrow">Start your search</p>
          <p>Tell me where you’re looking. I’ll help you make sense of what comes next.</p>
        </div>
        <HomeSearch />
      </section>

      <section className="collections section-pad">
        <div className="section-heading">
          <p className="eyebrow">Find your fit</p>
          <h2>A home for every chapter.</h2>
          <p>Whether you are ready for your first set of keys or your next strategic move, the right home starts with understanding how you want to live.</p>
        </div>
        <div className="collection-grid">
          {collections.map((item, index) => (
            <article className="collection-card" key={item.name}>
              {/* External editorial imagery keeps the site current without implying an active MLS listing. */}
              <img src={item.image} alt={`${item.name} residential style`} loading="lazy" />
              <span className="card-number">0{index + 1}</span>
              <div className="collection-overlay">
                <p>{item.note}</p>
                <h3>{item.name}</h3>
                <a href="#contact" aria-label={`Ask Victoria about ${item.name}`}>Discover your options <span>→</span></a>
              </div>
            </article>
          ))}
        </div>
        <p className="collection-note">Lifestyle imagery shown for inspiration; not represented as active listings.</p>
      </section>

      <section className="gallery-preview" aria-labelledby="gallery-preview-title">
        <div className="gallery-preview-copy">
          <p className="eyebrow light">The home gallery</p>
          <h2 id="gallery-preview-title">Save what catches<br /><em>your eye.</em></h2>
          <p>Browse a curated collection of home styles from across the United States, from city condos to acreage retreats. Save your favorites and use them to show Victoria how you want to live.</p>
          <div className="gallery-preview-actions">
            <Link className="button button-gold" href="/homes">Explore the gallery</Link>
            <span>12 curated home profiles</span>
          </div>
        </div>
        <div className="gallery-preview-mosaic">
          <Link href="/homes/modern-new-build" className="preview-tile preview-tile-large">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" alt="Modern new build exterior" loading="lazy" />
            <span>Modern new build <b>↗</b></span>
          </Link>
          <Link href="/homes/city-condo" className="preview-tile">
            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=85" alt="Contemporary city condo interior" loading="lazy" />
            <span>City condo <b>↗</b></span>
          </Link>
          <Link href="/homes/country-ranch" className="preview-tile">
            <img src="https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=900&q=85" alt="Country ranch on open acreage" loading="lazy" />
            <span>Country ranch <b>↗</b></span>
          </Link>
        </div>
      </section>

      <section className="service-story" id="sell">
        <div className="service-image">
          <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Refined modern living room" loading="lazy" />
          <div className="gold-frame" />
        </div>
        <div className="service-copy">
          <p className="eyebrow">Sell with intention</p>
          <h2>Your home deserves more than a listing.</h2>
          <p>From pricing and positioning to presentation and negotiation, Victoria builds a strategy around your goals—not a generic checklist.</p>
          <ol className="process-list">
            <li><span>01</span><div><strong>Position</strong><p>A thoughtful market analysis and pricing strategy built around today’s buyer.</p></div></li>
            <li><span>02</span><div><strong>Present</strong><p>Clear preparation, refined marketing, and a launch designed to make an impression.</p></div></li>
            <li><span>03</span><div><strong>Negotiate</strong><p>Calm, responsive representation from the first showing through the closing table.</p></div></li>
          </ol>
          <Link className="button button-dark" href="/sell">See the selling plan</Link>
        </div>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-copy">
          <p className="eyebrow">Meet your REALTOR®</p>
          <h2>Real guidance.<br /><em>Genuine care.</em></h2>
          <p className="about-lead">Victoria Olorede helps clients move with confidence, combining personal attention with the reach and resources of eXp Realty.</p>
          <p>Real estate is personal. Victoria keeps the process clear, protects the details, and stays close from the first conversation to the moment the keys change hands.</p>
          <blockquote>“It’s a deal with Vickytee the Realtor.”</blockquote>
          <div className="about-links">
            <a href="tel:+19408829004">(940) 882-9004</a>
            <a href="mailto:victoria.olorede@exprealty.com">victoria.olorede@exprealty.com</a>
          </div>
        </div>
        <div className="about-visual">
          <Image src="/victoria-portrait.jpeg" alt="Victoria Olorede, REALTOR with eXp Realty" width={1600} height={2000} />
          <div className="exp-badge"><strong>eXp</strong><span>REALTY</span></div>
        </div>
      </section>

      <SocialMedia />

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow light">Your next move</p>
          <h2>Let’s make it<br /><em>a smart one.</em></h2>
          <p>Buying, selling, investing, or just exploring? Share what is on your mind and Victoria will follow up personally.</p>
          <div className="contact-details">
            <a href="tel:+19408829004"><span>Call</span>(940) 882-9004</a>
            <a href="mailto:victoria.olorede@exprealty.com"><span>Email</span>victoria.olorede@exprealty.com</a>
          </div>
        </div>
        <ContactForm />
      </section>

      <SiteFooter />
    </main>
  );
}
