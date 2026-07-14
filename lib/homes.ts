export type HomeProfile = {
  slug: string;
  name: string;
  type: string;
  setting: string;
  segment: string;
  beds: string;
  baths: string;
  size: string;
  image: string;
  gallery: string[];
  summary: string;
  features: string[];
};

const images = {
  modern: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=88",
  estate: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=88",
  interior: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=88",
  kitchen: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=88",
  luxury: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=88",
  pool: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=88",
  bright: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=88",
  condo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=88",
  ranch: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=88",
  cottage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=88",
  townhome: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=88",
  land: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=88",
};

export const homes: HomeProfile[] = [
  { slug:"modern-new-build", name:"The Modern New Build", type:"New Construction", setting:"Suburban", segment:"$700K+", beds:"3–5", baths:"3–5", size:"2,800+ sq ft", image:images.modern, gallery:[images.modern,images.interior,images.kitchen], summary:"For buyers who want clean architecture, efficient systems, and the ease of being the first to call a home their own.", features:["Builder and contract guidance","Energy-conscious systems","Contemporary open layouts","Warranty review"] },
  { slug:"executive-estate", name:"The Executive Estate", type:"Luxury", setting:"Private Community", segment:"$1M+", beds:"4–6", baths:"4–7", size:"4,500+ sq ft", image:images.estate, gallery:[images.estate,images.luxury,images.pool], summary:"A refined home profile centered on privacy, scale, entertaining, and enduring architectural presence.", features:["Gated-community options","Entertaining spaces","Premium finishes","Privacy-focused search"] },
  { slug:"family-classic", name:"The Family Classic", type:"Single Family", setting:"Established Neighborhood", segment:"$400K+", beds:"3–5", baths:"2–4", size:"2,000+ sq ft", image:images.townhome, gallery:[images.townhome,images.bright,images.kitchen], summary:"A practical, welcoming home with flexible space, neighborhood connection, and room for the years ahead.", features:["Flexible floor plans","School-zone research","Outdoor living","Resale-minded guidance"] },
  { slug:"city-condo", name:"The City Condo", type:"Condo", setting:"Urban", segment:"$300K+", beds:"1–3", baths:"1–3", size:"900+ sq ft", image:images.condo, gallery:[images.condo,images.interior,images.bright], summary:"Low-maintenance living for buyers who value proximity, amenities, and a lock-and-leave lifestyle.", features:["HOA document review","Amenity comparisons","Walkability priorities","Condo financing guidance"] },
  { slug:"design-forward-home", name:"The Design-Forward Home", type:"Contemporary", setting:"In-Town", segment:"$600K+", beds:"3–4", baths:"2–4", size:"2,200+ sq ft", image:images.luxury, gallery:[images.luxury,images.interior,images.pool], summary:"Distinctive materials, intentional light, and thoughtful spaces for buyers who see home as personal expression.", features:["Architectural character","Curated interiors","Indoor-outdoor flow","Design-led search"] },
  { slug:"country-ranch", name:"The Country Ranch", type:"Ranch", setting:"Acreage", segment:"$800K+", beds:"3–5", baths:"2–5", size:"2,500+ sq ft", image:images.ranch, gallery:[images.ranch,images.land,images.cottage], summary:"More breathing room, useful land, and a quieter rhythm—paired with careful due diligence beyond the house itself.", features:["Acreage and boundary review","Well and septic considerations","Outbuilding needs","Land-use priorities"] },
  { slug:"first-home", name:"The First Home", type:"Starter Home", setting:"Connected Suburb", segment:"$250K+", beds:"2–4", baths:"1–3", size:"1,300+ sq ft", image:images.cottage, gallery:[images.cottage,images.bright,images.kitchen], summary:"An approachable first step into ownership, chosen with monthly comfort, condition, and future resale in mind.", features:["First-time buyer roadmap","Payment-focused search","Inspection guidance","Negotiation support"] },
  { slug:"townhome-life", name:"The Townhome", type:"Townhome", setting:"Mixed-Use Community", segment:"$350K+", beds:"2–4", baths:"2–4", size:"1,600+ sq ft", image:images.kitchen, gallery:[images.kitchen,images.condo,images.townhome], summary:"A balance of private-home comfort and manageable upkeep, often close to daily conveniences.", features:["HOA and fee comparison","Low-maintenance options","Community amenities","Commute-conscious search"] },
  { slug:"poolside-retreat", name:"The Poolside Retreat", type:"Luxury", setting:"Resort-Style", segment:"$900K+", beds:"4–6", baths:"3–6", size:"3,600+ sq ft", image:images.pool, gallery:[images.pool,images.estate,images.interior], summary:"A home profile made for gathering, relaxing, and enjoying a long outdoor season.", features:["Pool condition review","Outdoor entertaining","Landscape considerations","Premium-market strategy"] },
  { slug:"investment-property", name:"The Investment Property", type:"Investment", setting:"Growth Market", segment:"Varies", beds:"2–8", baths:"2–6", size:"Varies", image:images.bright, gallery:[images.bright,images.condo,images.townhome], summary:"A numbers-aware search shaped by your return goals, operating plan, and tolerance for renovation or management.", features:["Rental-market context","Cash-flow considerations","Property condition review","Exit-strategy thinking"] },
  { slug:"country-cottage", name:"The Country Cottage", type:"Cottage", setting:"Small Town", segment:"$300K+", beds:"2–4", baths:"1–3", size:"1,400+ sq ft", image:images.land, gallery:[images.land,images.cottage,images.ranch], summary:"Character, calm, and a little distance from the rush—without losing sight of access, condition, and long-term fit.", features:["Character-home evaluation","Commute and access","Renovation potential","Lifestyle-first search"] },
  { slug:"move-up-home", name:"The Move-Up Home", type:"Single Family", setting:"Premier Suburb", segment:"$650K+", beds:"4–6", baths:"3–5", size:"3,000+ sq ft", image:images.interior, gallery:[images.interior,images.modern,images.kitchen], summary:"More room and more refinement for the next chapter, coordinated with the sale or retention of your current home.", features:["Buy-and-sell coordination","Space planning","Equity strategy","Offer timing"] },
];

export const homeTypes = ["All", ...Array.from(new Set(homes.map((home) => home.type)))];
