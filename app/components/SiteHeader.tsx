"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  function closeAll() {
    setMenuOpen(false);
    setAboutOpen(false);
  }

  return <header className={`site-header ${overlay ? "overlay" : "solid"}`}>
    <Link className="brand" href="/" aria-label="Vickytee the Realtor home" onClick={closeAll}><Image src="/logo-gold.svg" alt="Vickytee the Realtor" width={270} height={82} priority /></Link>
    <nav aria-label="Primary navigation" className={menuOpen ? "nav-open" : ""}>
      <Link href="/homes" onClick={closeAll}>Gallery</Link>
      <Link href="/buy" onClick={closeAll}>Buy</Link>
      <Link href="/sell" onClick={closeAll}>Sell</Link>
      <div className={`nav-dropdown ${aboutOpen ? "open" : ""}`}>
        <button type="button" className="nav-dropdown-trigger" aria-expanded={aboutOpen} onClick={() => setAboutOpen((value) => !value)}>
          About Us <span className="nav-caret" aria-hidden="true">⌄</span>
        </button>
        <div className="nav-dropdown-panel">
          <Link href="/about" onClick={closeAll}><span className="nav-breadcrumb">About Us /</span>Meet Vickytee</Link>
          <Link href="/about/broker-information" onClick={closeAll}><span className="nav-breadcrumb">About Us /</span>Broker Information</Link>
        </div>
      </div>
      <Link href="/contact" onClick={closeAll}>Contact</Link>
    </nav>
    <Link className="header-cta" href="/contact">Let’s talk</Link>
    <button
      type="button"
      className={`nav-toggle ${menuOpen ? "open" : ""}`}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen((value) => !value)}
    >
      <span /><span /><span />
    </button>
  </header>;
}
