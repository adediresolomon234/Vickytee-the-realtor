import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Vickytee the Realtor",
  description: "Learn how Vickytee the Realtor collects, uses, protects, and shares personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <SiteHeader />
      <section className="legal-page-header">
        <p className="eyebrow light">Legal / Privacy</p>
        <h1>Privacy Policy</h1>
        <p>Effective Date: August 13, 2026<br />Last Updated: August 13, 2026</p>
      </section>

      <section className="legal-content">
        <p>Welcome to vickyteetherealtor.com, operated by VICKYTEETHEREALTOR. Your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and disclose personal information when you use our website and related online services (collectively, the &ldquo;Services&rdquo;).</p>
        <p>This Privacy Policy applies only to users located in the United States. By accessing or using the Website or Services, you agree to this Privacy Policy.</p>

        <h3>1. Information We Collect</h3>
        <p><strong>1.1 Information You Provide Voluntarily</strong></p>
        <p>We may collect personal information you voluntarily provide, including but not limited to:</p>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Mobile phone number</li>
          <li>Business name</li>
          <li>Website URL</li>
          <li>Appointment or inquiry details</li>
          <li>Information submitted through forms, surveys, chat, or bookings</li>
        </ul>
        <p>Providing personal information is voluntary; however, certain services may not be available without it.</p>
        <p><strong>1.2 Automatically Collected Information</strong></p>
        <p>When you visit the Website, we may automatically collect non-personal information such as:</p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>Pages viewed and time spent</li>
          <li>Referring and exit URLs</li>
          <li>Approximate location derived from IP address</li>
        </ul>
        <p>This data is used for analytics, security, and Website optimization.</p>
        <p><strong>1.3 Cookies and Tracking Technologies</strong></p>
        <p>We may use cookies, pixels, and similar technologies to support Website functionality, analytics, security, and remarketing. You can disable cookies through your browser settings.</p>

        <h3>2. How We Use Your Information</h3>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and deliver services you request</li>
          <li>Respond to inquiries and provide customer support</li>
          <li>Schedule and manage appointments</li>
          <li>Send transactional communications</li>
          <li>Send email communications in compliance with U.S. CAN-SPAM laws</li>
          <li>Send SMS/text messages only with valid opt-in consent</li>
          <li>Improve Website performance and user experience</li>
          <li>Comply with legal and regulatory obligations</li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h3>3. Email Marketing Compliance</h3>
        <p>If you provide your email address, we may send transactional emails and promotional emails where permitted by law. All marketing emails include a clear unsubscribe option. You may opt out of marketing emails at any time.</p>
        <p>Opting out of marketing emails does not prevent delivery of transactional emails necessary to provide requested services.</p>

        <h3>4. Text / SMS Messaging Policy (A2P / TCPA / CTIA)</h3>
        <p><strong>4.1 Program Description</strong></p>
        <p>If you opt in, you may receive text messages from VICKYTEETHEREALTOR, including:</p>
        <ul>
          <li>Transactional messages, such as appointment confirmations, reminders, and service updates</li>
          <li>Promotional messages, such as marketing offers, announcements, and educational content, only with explicit consent</li>
        </ul>
        <p><strong>4.2 Consent</strong></p>
        <p>By providing your mobile number and opting in, you provide express written consent to receive text messages. Consent is not a condition of purchase and is collected through a clear, unchecked opt-in mechanism.</p>
        <p><strong>4.3 Message Frequency</strong></p>
        <p>Message frequency varies depending on your interaction with our Services.</p>
        <p><strong>4.4 Fees</strong></p>
        <p>Message and data rates may apply.</p>
        <p><strong>4.5 Opt-Out</strong></p>
        <p>You may opt out at any time by replying STOP. You may receive one final confirmation message after opting out.</p>
        <p><strong>4.6 Help</strong></p>
        <p>Reply HELP for help or contact us at <a href="mailto:victoria@vickyteetherealtor.com">victoria@vickyteetherealtor.com</a> or <a href="tel:+19452371832">+1 945-237-1832</a>.</p>
        <p><strong>4.7 Transactional vs. Promotional Messages</strong></p>
        <p>Transactional messages may be sent to fulfill services you request. Promotional messages are sent only with explicit opt-in and stop immediately upon opt-out.</p>
        <p><strong>4.8 Opt-In Confirmation</strong></p>
        <p>After opting in, you will receive a confirmation message that includes program details, business identity, message frequency, message and data rate disclosure, STOP/HELP instructions, and customer support contact information.</p>

        <h3>5. Mobile Information Sharing</h3>
        <p>No mobile information, including phone numbers, SMS opt-in data, or consent records, will be shared with third parties or affiliates for marketing or promotional purposes.</p>
        <p>Text messaging originator opt-in data and consent will never be shared with third parties.</p>

        <h3>6. Limited Sharing With Service Providers</h3>
        <p>We may share information with trusted service providers solely to operate our business, such as CRM platforms, SMS providers, hosting services, and analytics tools. These providers are contractually obligated to protect your information and may not use it for their own marketing.</p>

        <h3>7. Third-Party Links and Remarketing</h3>
        <p>The Website may contain links to third-party websites. We are not responsible for their content or privacy practices. We may use third-party advertising platforms, such as Google, for remarketing purposes.</p>

        <h3>8. Data Security</h3>
        <p>We implement reasonable administrative, technical, and physical safeguards to protect personal information. No system is completely secure.</p>

        <h3>9. Data Retention</h3>
        <p>We retain personal information only as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.</p>

        <h3>10. Children&rsquo;s Privacy (COPPA)</h3>
        <p>The Website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

        <h3>11. Changes to This Privacy Policy</h3>
        <p>We may update this Privacy Policy at any time. Changes will be posted with an updated Effective Date.</p>

        <h3>12. Contact Us</h3>
        <div className="legal-contact-card" style={{ maxWidth: 430 }}>
          <span>Vickytee the Realtor</span>
          <strong>Privacy questions and requests</strong>
          <a href="mailto:victoria@vickyteetherealtor.com">victoria@vickyteetherealtor.com</a>
          <a href="https://vickyteetherealtor.com">vickyteetherealtor.com</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
