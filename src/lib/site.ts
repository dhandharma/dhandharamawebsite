/**
 * Single source of truth for business details and page copy.
 * Everything here came from the Stitch "Homepage Redesign Project" design,
 * except where noted. Edit this file to update the site.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const site = {
  name: "Dhan Dharma Finserv",
  tagline: "Gold Loan & Finance Services",
  description:
    "Gold loans, personal loans, business loans and loan against property at the Dhan Dharma Finserv branch in Ponnani, Malappuram, Kerala. Transparent gold appraisal and minimal paperwork.",
  phoneDisplay: "+91 99616 89099",
  phoneTel: "+919961689099",
  /** wa.me number: country code + number, digits only. */
  whatsapp: "919961689099",
  address: {
    street: "Malappuram Road",
    locality: "Ponnani",
    district: "Malappuram",
    region: "Kerala",
    country: "India",
  },
  hours: { days: "Mon – Sat", time: "9:30 AM – 6:00 PM" },
  areas: ["Ponnani", "Tirur", "Kuttippuram", "Edappal", "Malappuram"],
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.locality}, ${site.address.district}, ${site.address.region}`,
)}`;

export const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Areas", href: "/#areas" },
  { label: "Contact", href: "/contact" },
] as const;

export type ServiceId = "gold" | "personal" | "business" | "property";

export type Service = {
  id: ServiceId;
  name: string;
  short: string;
  eyebrow: string;
  headline: string;
  lead: string;
  body: string;
  facts: readonly [{ label: string; value: string }, { label: string; value: string }];
  cta: string;
  image: "gold" | "advisor";
  imageAlt: string;
  imagePosition: string;
};

export const services: readonly Service[] = [
  {
    id: "gold",
    name: "Gold Loans",
    short: "Instant cash & a fair per-gram rate",
    eyebrow: "Spot cash & per-gram valuation",
    headline: "High-Value Gold Loans",
    lead: "Unlock liquidity against your gold jewellery with no hidden charges.",
    body: "Competitive per-gram valuation, customised repayment tenures and easy interest servicing options. Your pledged gold is kept in secure custody and returned in the same condition when you close the loan.",
    facts: [
      { label: "Documentation", value: "Minimal KYC (Aadhaar / ID)" },
      { label: "Custody", value: "Secure vault storage" },
    ],
    cta: "Enquire about a Gold Loan",
    image: "gold",
    imageAlt: "Gold jewellery, coins and an appraisal scale on a dark wooden surface",
    imagePosition: "50% 50%",
  },
  {
    id: "personal",
    name: "Personal Loans",
    short: "Quick emergency & family funding",
    eyebrow: "Family & emergency needs",
    headline: "Personal Loans",
    lead: "Quick financial support with transparent terms and manageable EMIs.",
    body: "Designed for immediate requirements such as wedding expenses, medical treatment, house repairs or children's higher education, without complicated delays.",
    facts: [
      { label: "Approval", value: "Fast, simple process" },
      { label: "Tenure", value: "Flexible repayment" },
    ],
    cta: "Apply for a Personal Loan",
    image: "advisor",
    imageAlt: "A financial advisor assisting a customer with paperwork at a branch desk",
    imagePosition: "50% 40%",
  },
  {
    id: "business",
    name: "Business & SME Loans",
    short: "Working capital for local traders",
    eyebrow: "Enterprise growth support",
    headline: "Business & SME Loans",
    lead: "Support for local retailers, traders and small ventures across Malappuram.",
    body: "Fund inventory purchases, seasonal working capital and retail expansion with financing tailored to your business and straightforward verification.",
    facts: [
      { label: "Focus", value: "Retail & wholesale" },
      { label: "Disbursal", value: "Direct account transfer" },
    ],
    cta: "Enquire about Business Loans",
    image: "gold",
    imageAlt: "Gold jewellery and an appraisal scale",
    imagePosition: "20% 60%",
  },
  {
    id: "property",
    name: "Loan Against Property",
    short: "Secured funding for larger goals",
    eyebrow: "High-limit secured credit",
    headline: "Loan Against Property",
    lead: "Substantial capital backing for major milestones and investments.",
    body: "Use the value of your commercial or residential property to secure larger funds, with extended tenures and personalised repayment schedules.",
    facts: [
      { label: "Tenure", value: "Long term" },
      { label: "Processing", value: "Dedicated advisor" },
    ],
    cta: "Contact us about Property Loans",
    image: "advisor",
    imageAlt: "Advisory desk at the branch",
    imagePosition: "70% 55%",
  },
] as const;

export const heroSlides = [
  {
    eyebrow: "Trusted Gold Loan & Financial Assistance",
    lead: "Instant Gold Loans.",
    emphasis: "Maximum Value for Your Gold.",
    body: "Fast approval, transparent appraisal, secure custody and flexible repayment tailored to your personal and business needs in Malappuram.",
    primary: { label: "Apply for Gold Loan", href: "/contact" },
    secondary: { label: "Explore Gold Loans", href: "/#services" },
    footnote: "Ponnani · Malappuram Road",
    image: "gold" as const,
    imageAlt: "Gold jewellery, coins and an appraisal scale on a dark wooden surface",
    imagePosition: "50% 50%",
    cardTitle: "Transparent Appraisal",
    cardText: "Tested and weighed right in front of you",
    cardIcon: "scale" as const,
  },
  {
    eyebrow: "Personal & Business Credit",
    lead: "Empowering Ambitions.",
    emphasis: "Simple Personal Loans.",
    body: "Transparent terms, minimal documentation and dedicated branch service in Ponnani for medical emergencies, business expansion and family needs.",
    primary: { label: "Apply for Personal Loan", href: "/contact" },
    secondary: { label: "Call the Branch", href: `tel:${site.phoneTel}` },
    footnote: "Walk-ins welcome · Ponnani, Malappuram",
    image: "advisor" as const,
    imageAlt: "A financial advisor assisting a customer with paperwork at a branch desk",
    imagePosition: "50% 40%",
    cardTitle: "Prompt Branch Service",
    cardText: "Speak to an advisor at our Ponnani branch",
    cardIcon: "handshake" as const,
  },
  {
    eyebrow: "Business & SME Loans",
    lead: "Working Capital,",
    emphasis: "Made Simple.",
    body: "Fund inventory purchases, seasonal working capital and retail expansion with financing tailored to your business and straightforward verification.",
    primary: { label: "Enquire about Business Loans", href: "/contact" },
    secondary: { label: "Explore Services", href: "/#services" },
    footnote: "Retail & wholesale · Direct account transfer",
    image: "gold" as const,
    imageAlt: "Gold jewellery and an appraisal scale",
    imagePosition: "15% 60%",
    cardTitle: "Built for Local Traders",
    cardText: "Straightforward verification and direct transfer",
    cardIcon: "banknote" as const,
  },
  {
    eyebrow: "Loan Against Property",
    lead: "Your Property,",
    emphasis: "Your Bigger Goals.",
    body: "Use the value of your commercial or residential property to secure larger funds, with extended tenures and personalised repayment schedules.",
    primary: { label: "Contact us about Property Loans", href: "/contact" },
    secondary: { label: "Call the Branch", href: `tel:${site.phoneTel}` },
    footnote: "Long tenure · Dedicated advisor",
    image: "advisor" as const,
    imageAlt: "A financial advisor assisting a customer with paperwork at a branch desk",
    imagePosition: "78% 50%",
    cardTitle: "Dedicated Advisor",
    cardText: "Personalised repayment schedules",
    cardIcon: "handshake" as const,
  },
] as const;

export const trustPoints = [
  {
    icon: "scale" as const,
    title: "Transparent appraisal",
    text: "Digital carat testing and precision weighing in front of you.",
  },
  {
    icon: "fileText" as const,
    title: "Minimal paperwork",
    text: "Aadhaar or a valid identity proof is all we need for KYC.",
  },
  {
    icon: "lock" as const,
    title: "Secure custody",
    text: "Pledged gold is sealed in tamper-evident packing.",
  },
  {
    icon: "mapPin" as const,
    title: "A branch you can visit",
    text: "Talk to a real advisor at our Ponnani branch.",
  },
] as const;

export const steps = [
  {
    icon: "scale" as const,
    title: "Transparent Appraisal",
    text: "Digital carat testing and precision weighing right before your eyes.",
  },
  {
    icon: "fileText" as const,
    title: "Simple KYC",
    text: "Minimal paperwork with only Aadhaar or a valid identity proof.",
  },
  {
    icon: "banknote" as const,
    title: "Funds Disbursed",
    text: "Funds credited to your bank account or paid as spot cash.",
  },
] as const;

export const inquiryPurposes = [
  "Gold Loan",
  "Gold Valuation & Per-Gram Rate",
  "Personal Loan",
  "Business & SME Loan",
  "Loan Against Property",
  "General Branch Information",
] as const;
