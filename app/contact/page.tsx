import Script from "next/script";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="contact-page">
        <div className="contact-page-copy">
          <p className="eyebrow light">Let’s talk real estate</p>
          <h1>Your next move<br /><em>starts here.</em></h1>
          <p>Buying, selling, investing, or still figuring it out? Tell Victoria where you are in the process.</p>
          <div className="contact-details">
            <a href="tel:+19408829004"><span>Call</span>(940) 882-9004</a>
            <a href="mailto:victoria.olorede@exprealty.com"><span>Email</span>victoria.olorede@exprealty.com</a>
            <a href="https://www.instagram.com/vickyteetherealtor"><span>Instagram</span>@vickyteetherealtor</a>
          </div>
        </div>
        <div className="contact-embed">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/SrnGQgAY9s3eZmG2vzYv"
            id="inline-SrnGQgAY9s3eZmG2vzYv"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Client Intake Form"
            data-height="1743"
            data-layout-iframe-id="inline-SrnGQgAY9s3eZmG2vzYv"
            data-form-id="SrnGQgAY9s3eZmG2vzYv"
            title="Client Intake Form"
          />
          <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
