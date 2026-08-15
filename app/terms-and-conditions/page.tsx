import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions | Vickytee the Realtor",
  description: "Terms and conditions governing your use of the Vickytee the Realtor website and online services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="legal-page-header">
        <p className="eyebrow light">Legal / Terms</p>
        <h1>Terms &amp; Conditions</h1>
        <p>Effective Date: August 13, 2026<br />Last Updated: August 13, 2026</p>
      </section>

      <section className="legal-content">
        <p>These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of vickyteetherealtor.com and its related online services (collectively, the &ldquo;Services&rdquo;), operated by VICKYTEETHEREALTOR. By accessing or using the Services, you agree to these Terms. If you do not agree, do not use the Services.</p>

        <h3>1. Informational Purpose</h3>
        <p>The content on this Website is provided for general informational and marketing purposes only. It is not legal, tax, financial, appraisal, inspection, or other professional advice. You should consult an appropriately licensed professional before making decisions based on information presented through the Services.</p>

        <h3>2. Real Estate Services and Agency Relationships</h3>
        <p>Use of this Website, submission of an inquiry, or communication through a form, email, telephone call, or text message does not by itself create a broker-client, agency, fiduciary, or other professional relationship. Any real estate representation is subject to a separate written agreement and applicable law. Brokerage services are provided through eXp Realty.</p>

        <h3>3. Property Information</h3>
        <p>Property descriptions, prices, availability, dimensions, school information, taxes, photographs, and other listing details may be supplied by third parties and are subject to change or withdrawal without notice. Although we aim to provide reliable information, we do not warrant that any property information is accurate, complete, current, or error-free. Users should independently verify information that is important to a purchase, sale, lease, or investment decision.</p>

        <h3>4. Equal Housing Opportunity</h3>
        <p>VICKYTEETHEREALTOR supports the principles of the Fair Housing Act and Equal Housing Opportunity. We do not discriminate on the basis of race, color, religion, sex, disability, familial status, national origin, or any other status protected by applicable law.</p>

        <h3>5. Eligibility and Permitted Use</h3>
        <p>You must be at least 18 years old and legally capable of entering into a binding agreement to use the Services. You may use the Services only for lawful, personal, and non-commercial purposes related to evaluating or obtaining real estate services.</p>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Services in violation of any applicable law or regulation;</li>
          <li>Submit false, misleading, fraudulent, or unauthorized information;</li>
          <li>Interfere with the operation, security, or availability of the Website;</li>
          <li>Attempt to gain unauthorized access to any system, account, or data;</li>
          <li>Use automated tools to scrape, harvest, copy, or index Website content without written permission; or</li>
          <li>Reproduce, distribute, modify, or commercially exploit Website content except as permitted by law or with written authorization.</li>
        </ul>

        <h3>6. Intellectual Property</h3>
        <p>The Website and its original text, design, branding, graphics, photographs, video, logos, and other content are owned by or licensed to VICKYTEETHEREALTOR and are protected by applicable intellectual property laws. REALTOR® is a registered trademark of the National Association of REALTORS®. Third-party names, marks, and content remain the property of their respective owners.</p>

        <h3>7. Communications</h3>
        <p>If you provide contact information, we may respond to your request using the method you selected. Marketing emails may be unsubscribed from using the link included in the message. SMS messages are sent only with the required consent; message frequency varies, message and data rates may apply, and you may reply STOP to opt out or HELP for help. Consent to marketing messages is not a condition of purchase.</p>

        <h3>8. Privacy</h3>
        <p>Your use of the Services is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which explains how we collect, use, protect, and disclose information.</p>

        <h3>9. Third-Party Websites and Services</h3>
        <p>The Services may include links to listing platforms, social networks, mapping providers, mortgage resources, and other third-party websites or services. We do not control or endorse third-party services and are not responsible for their availability, content, security, terms, or privacy practices. Your use of a third-party service is governed by that provider&rsquo;s terms.</p>

        <h3>10. Disclaimer of Warranties</h3>
        <p>To the fullest extent permitted by law, the Services are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, express or implied. We do not guarantee uninterrupted access, error-free operation, particular real estate outcomes, or the accuracy or availability of any listing or other Website content.</p>

        <h3>11. Limitation of Liability</h3>
        <p>To the fullest extent permitted by law, VICKYTEETHEREALTOR, Victoria Olorede, eXp Realty, and their respective affiliates, agents, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from or related to your use of, or inability to use, the Services. Nothing in these Terms excludes liability that cannot lawfully be excluded.</p>

        <h3>12. Indemnification</h3>
        <p>To the extent permitted by law, you agree to defend, indemnify, and hold harmless VICKYTEETHEREALTOR and its affiliates, agents, and service providers from claims, damages, liabilities, losses, and expenses arising from your unlawful use of the Services, your violation of these Terms, or your infringement of another person&rsquo;s rights.</p>

        <h3>13. Governing Law</h3>
        <p>These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles. Any dispute relating to these Terms or the Services will be brought in a court of competent jurisdiction in Texas, unless applicable law requires otherwise.</p>

        <h3>14. Changes to the Services or These Terms</h3>
        <p>We may modify, suspend, or discontinue any part of the Services and may update these Terms from time to time. Revised Terms become effective when posted with an updated date. Your continued use of the Services after an update means you accept the revised Terms.</p>

        <h3>15. Severability and Entire Agreement</h3>
        <p>If any provision of these Terms is found unenforceable, the remaining provisions will remain in effect. These Terms and the Privacy Policy constitute the entire agreement between you and VICKYTEETHEREALTOR concerning use of the Website, except where a separate written agreement applies.</p>

        <h3>16. Contact Us</h3>
        <div className="legal-contact-card" style={{ maxWidth: 430 }}>
          <span>Vickytee the Realtor</span>
          <strong>Questions about these Terms</strong>
          <a href="mailto:victoria@vickyteetherealtor.com">victoria@vickyteetherealtor.com</a>
          <a href="tel:+19452371832">+1 945-237-1832</a>
          <a href="https://vickyteetherealtor.com">vickyteetherealtor.com</a>
        </div>

        <div className="legal-note">
          <Image src="/equal-housing.png" alt="Equal Housing Opportunity" width={40} height={42} unoptimized />
          <p>Property information is deemed reliable but not guaranteed and should be independently verified. Equal Housing Opportunity.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
