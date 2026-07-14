"use client";

import Link from "next/link";
import { useState } from "react";

const roomNames = ["Arrival & exterior", "Main living area", "Kitchen & dining"];
const roomNotes = [
  "Start outside and take in the architecture, approach, and setting.",
  "Move into the main gathering space and explore how the home lives day to day.",
  "Finish in the heart of the home, with attention to flow, storage, and entertaining.",
];
const tagPositions = [["24%", "34%"], ["68%", "57%"], ["44%", "72%"]];

export function GuidedTour({ name, images, features }: { name: string; images: string[]; features: string[] }) {
  const [active, setActive] = useState(0);
  const currentName = roomNames[active] || `Space ${active + 1}`;
  const previous = () => setActive((current) => (current - 1 + images.length) % images.length);
  const next = () => setActive((current) => (current + 1) % images.length);

  return (
    <section className="guided-tour" aria-labelledby="guided-tour-title">
      <div className="tour-heading">
        <div>
          <p className="eyebrow">Interactive home experience</p>
          <h2 id="guided-tour-title">Move through every space.</h2>
        </div>
        <p>Use the directional controls or room tabs to explore this home profile. Tap the markers to notice the details Victoria can help you evaluate.</p>
      </div>

      <div className="tour-stage">
        <div className="tour-image" aria-live="polite">
          <img src={images[active]} alt={`${name} — ${currentName}`} />
          <div className="tour-image-shade" />
          {features.slice(active, active + 2).map((feature, index) => (
            <span className="room-hotspot" style={{ left: tagPositions[(active + index) % tagPositions.length][0], top: tagPositions[(active + index) % tagPositions.length][1] }} key={feature}>
              <b aria-hidden="true">+</b>{feature}
            </span>
          ))}
          <button className="tour-arrow tour-arrow-left" type="button" onClick={previous} aria-label="Go to previous space">←</button>
          <button className="tour-arrow tour-arrow-right" type="button" onClick={next} aria-label="Go to next space">→</button>
          <div className="tour-caption"><span>0{active + 1} / 0{images.length}</span><div><strong>{currentName}</strong><p>{roomNotes[active]}</p></div></div>
        </div>

        <div className="tour-room-nav" role="tablist" aria-label="Choose a space">
          {images.map((image, index) => (
            <button type="button" role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)} key={image}>
              <img src={image} alt="" /><span>0{index + 1}<strong>{roomNames[index] || `Space ${index + 1}`}</strong></span>
            </button>
          ))}
        </div>
      </div>

      <div className="live-tour-bar">
        <div className="live-tour-signal"><span aria-hidden="true" /><div><small>Live video walkthrough</small><strong>See the home with Victoria, wherever you are.</strong></div></div>
        <p>Request a personal video call from a property so you can ask questions and direct the walkthrough in real time.</p>
        <div><Link className="button button-gold" href={`/contact?interest=${encodeURIComponent(`Live video tour — ${name}`)}`}>Book a live tour</Link><Link className="tour-video-link" href="/#social">Watch property videos ↗</Link></div>
      </div>
    </section>
  );
}
