import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Broker Information | Vickytee the Realtor",
  description: "Required Texas Real Estate Commission disclosures: Information About Brokerage Services and the TREC Consumer Protection Notice.",
};

export default function BrokerInformationPage() {
  return (
    <main>
      <SiteHeader />
      <section className="legal-page-header">
        <p className="eyebrow light">About Us / Broker Information</p>
        <h1>Information about<br /><em>brokerage services.</em></h1>
        <p>Texas law requires all real estate license holders to give the following information about brokerage services to prospective buyers, tenants, sellers, and landlords, along with the Texas Real Estate Commission&rsquo;s consumer protection notice.</p>
      </section>

      <section className="legal-content">
        <h2 id="information-about-brokerage-services">Information About Brokerage Services</h2>

        <h3>Types of real estate license holders</h3>
        <ul>
          <li>A <strong>BROKER</strong> is responsible for all brokerage activities, including acts performed by sales agents sponsored by the broker.</li>
          <li>A <strong>SALES AGENT</strong> must be sponsored by a broker and works with clients on behalf of the broker.</li>
        </ul>

        <h3>A broker&rsquo;s minimum duties required by law</h3>
        <p>A client is the person or party that the broker represents.</p>
        <ul>
          <li>Put the interests of the client above all others, including the broker&rsquo;s own interests;</li>
          <li>Inform the client of any material information about the property or transaction received by the broker;</li>
          <li>Answer the client&rsquo;s questions and present any offer to or counter-offer from the client; and</li>
          <li>Treat all parties to a real estate transaction honestly and fairly.</li>
        </ul>

        <h3>Written agreements are required in certain situations</h3>
        <p>A license holder who performs brokerage activity for a prospective buyer of residential property must enter into a written agreement with the buyer before showing any residential property to the buyer, or if no residential property will be shown, before presenting an offer on behalf of the buyer. This written agreement must contain specific information required by Texas law. For more information on these requirements, see section 1101.563 of the Texas Occupations Code. Even if a written agreement is not required, to avoid disputes, all agreements between you and a broker should be in writing and clearly establish: (i) the broker&rsquo;s duties and responsibilities to you and your obligations under the agreement; and (ii) the amount or rate of compensation the broker will receive and how this amount is determined.</p>

        <h3>A license holder can represent a party in a real estate transaction</h3>
        <p><strong>As agent for owner (seller/landlord):</strong> The broker becomes the property owner&rsquo;s agent through an agreement with the owner, usually in a written listing to sell or property management agreement. An owner&rsquo;s agent must perform the broker&rsquo;s minimum duties above and must inform the owner of any material information about the property or transaction known by the agent, including information disclosed to the agent by the buyer or buyer&rsquo;s agent. An owner&rsquo;s agent fees are not set by law and are fully negotiable.</p>
        <p><strong>As agent for buyer/tenant:</strong> The broker becomes the buyer/tenant&rsquo;s agent by agreeing to represent the buyer, usually through a written representation agreement. A buyer&rsquo;s agent must perform the broker&rsquo;s minimum duties above and must inform the buyer of any material information about the property or transaction known by the agent, including information disclosed to the agent by the seller or seller&rsquo;s agent. A buyer/tenant&rsquo;s agent fees are not set by law and are fully negotiable.</p>
        <p><strong>As agent for both &ndash; intermediary:</strong> To act as an intermediary between the parties the broker must first obtain the written agreement of each party to the transaction. The written agreement must state who will pay the broker and, in conspicuous bold or underlined print, set forth the broker&rsquo;s obligations as an intermediary. A broker who acts as an intermediary:</p>
        <ul>
          <li>Must treat all parties to the transaction impartially and fairly;</li>
          <li>May, with the parties&rsquo; written consent, appoint a different license holder associated with the broker to each party (owner and buyer) to communicate with, provide opinions and advice to, and carry out the instructions of each party to the transaction;</li>
          <li>Must not, unless specifically authorized in writing to do so by the party, disclose that the owner will accept a price less than the written asking price, that the buyer/tenant will pay a price greater than the price submitted in a written offer, or any confidential information or any other information that a party specifically instructs the broker in writing not to disclose, unless required to do so by law.</li>
        </ul>

        <h3>A license holder can show property to a buyer/tenant without representing the buyer/tenant if</h3>
        <ul>
          <li>The broker has not agreed with the buyer/tenant, either orally or in writing, to represent the buyer/tenant;</li>
          <li>The broker is not otherwise acting as the buyer/tenant&rsquo;s agent at the time of showing the property;</li>
          <li>The broker does not provide the buyer/tenant opinions or advice regarding the property or real estate transactions generally; and</li>
          <li>The broker does not perform any other act of real estate brokerage for the buyer/tenant.</li>
        </ul>
        <p>Before showing a residential property to an unrepresented prospective buyer, a license holder must enter into a written agreement that contains the information required by section 1101.563 of the Texas Occupations Code. The agreement may not be exclusive and must be limited to no more than 14 days.</p>

        <h3>License holder contact information</h3>
        <p>This notice is being provided for information purposes. It does not create an obligation for you to use the broker&rsquo;s services.</p>
        <div className="legal-contact-grid">
          <div className="legal-contact-card">
            <span>Sponsoring Broker</span>
            <strong>eXp Realty LLC &mdash; License 603392-BB</strong>
            <a href="mailto:tx.broker@exprealty.net">tx.broker@exprealty.net</a>
            <a href="tel:+18885197431">(888) 519-7431</a>
          </div>
          <div className="legal-contact-card">
            <span>Designated Broker</span>
            <strong>Karen Richards &mdash; License 508111-B</strong>
            <a href="mailto:tx.broker@exprealty.net">tx.broker@exprealty.net</a>
            <a href="tel:+18885197431">(888) 519-7431</a>
          </div>
          <div className="legal-contact-card">
            <span>Licensed Supervisor of Sales Agent</span>
            <strong>Karen Richards &mdash; License 508111-B</strong>
            <a href="mailto:tx.broker@exprealty.net">tx.broker@exprealty.net</a>
            <a href="tel:+18885197431">(888) 519-7431</a>
          </div>
          <div className="legal-contact-card">
            <span>Sales Agent / Associate</span>
            <strong>Victoria Olorede &mdash; License 853908-SA</strong>
            <a href="mailto:victoria.olorede@exprealty.com">victoria.olorede@exprealty.com</a>
            <a href="tel:+19452371832">+1 945-237-1832</a>
          </div>
        </div>
        <p>Regulated by the Texas Real Estate Commission. Information available at <a href="https://www.trec.texas.gov" target="_blank" rel="noreferrer">www.trec.texas.gov</a>. TXR 2501 &middot; IABS 1-2</p>

        <hr className="legal-divider" />

        <h2 id="consumer-protection-notice">TREC Consumer Protection Notice</h2>
        <ul>
          <li>The Texas Real Estate Commission (TREC) regulates real estate brokers and sales agents, real estate inspectors, easement and right-of-way agents, and timeshare interest providers.</li>
          <li>You can find more information and check the status of a license holder at <a href="https://www.trec.texas.gov" target="_blank" rel="noreferrer">www.trec.texas.gov</a>.</li>
          <li>You can send a complaint against a license holder to TREC. A complaint form is available on the TREC website.</li>
          <li>TREC administers the Real Estate Recovery Trust Account, which may be used to satisfy a civil court judgment against a broker, sales agent, or easement or right-of-way agent, if certain requirements are met.</li>
          <li>Real estate inspectors are required to maintain errors and omissions insurance to cover losses arising from the performance of a real estate inspection in a negligent or incompetent manner.</li>
        </ul>
        <p>Please note: inspectors may limit liability through provisions in the contract or inspection agreement between the inspector and their clients. Please be sure to read any contract or agreement carefully. If you do not understand any terms or provisions, consult an attorney.</p>
        <p>If you have questions or issues about the activities of a license holder, the complaint process, or the recovery trust account, please visit the website or contact TREC at:</p>
        <div className="legal-contact-card" style={{ maxWidth: 340 }}>
          <span>Texas Real Estate Commission</span>
          <strong>P.O. Box 12188, Austin, Texas 78711-2188</strong>
          <a href="tel:+15129363000">(512) 936-3000</a>
        </div>

        <div className="legal-note">
          <img src="/equal-housing.png" alt="Equal Housing Opportunity" />
          <p>Vickytee the Realtor is proud to support Equal Housing Opportunity. Property information on this site is supplied for general guidance and should be independently verified.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
