import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="contact-page contact-page-no-form">
        <div className="contact-page-copy">
          <p className="eyebrow light">Let’s talk real estate</p>
          <h1>Your next move<br /><em>starts here.</em></h1>
          <p>Buying, selling, investing, or still figuring it out? Tell Victoria where you are in the process.</p>
          <div className="contact-details">
            <a href="tel:+19452371832"><span>Call</span>+1 945-237-1832</a>
            <a href="mailto:victoria.olorede@exprealty.com"><span>Email</span>victoria.olorede@exprealty.com</a>
            <a href="https://www.instagram.com/vickyteetherealtor"><span>Instagram</span>@vickyteetherealtor</a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
