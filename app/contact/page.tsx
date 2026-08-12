import { ContactForm } from "../components/ContactForm";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export default function ContactPage() { return <main><SiteHeader /><section className="contact-page"><div className="contact-page-copy"><p className="eyebrow light">Let’s talk real estate</p><h1>Your next move<br /><em>starts here.</em></h1><p>Buying, selling, investing, or still figuring it out? Tell Victoria where you are in the process.</p><div className="contact-details"><a href="tel:+19408829004"><span>Call</span>(940) 882-9004</a><a href="mailto:victoria.olorede@exprealty.com"><span>Email</span>victoria.olorede@exprealty.com</a><a href="https://www.instagram.com/vickyteetherealtor"><span>Instagram</span>@vickyteetherealtor</a></div></div><ContactForm /></section><SiteFooter /></main>; }
