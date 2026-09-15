// Central data for the Auratech electronics store.
// All image URLs verified reachable (HTTP 200) from the Unsplash CDN.
import type {
  Category,
  FooterColumn,
  NavLink,
  Perk,
  Product,
  Promo,
} from "./types";

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

// ---- Navbar links ----
export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Headphones", to: "/shop/headphones" },
  { label: "Earphones", to: "/shop/earbuds" },
  { label: "Speakers", to: "/shop/speakers" },
  { label: "Accessories", to: "/shop/accessories" },
];

// ---- Trusted brand wordmarks (rendered as text) ----
export const brands: string[] = [
  "SONY",
  "APPLE",
  "SAMSUNG",
  "BOSE",
  "SENNHEISER",
  "JBL",
];

// ---- Category cards (the "Most Popular Categories" carousel) ----
export const categories: Category[] = [
  { key: "headphones", name: "Headphones", image: img("1505740420928-5e560c06d30e", 700) },
  { key: "earbuds", name: "Earbuds", image: img("1590658268037-6bf12165a8df", 700) },
  { key: "smartwatch", name: "Smart Watch", image: img("1546868871-7041f2a55e12", 700) },
  { key: "speakers", name: "Speakers", image: img("1608043152269-423dbba4e7e1", 700) },
  { key: "laptops", name: "Laptops", image: img("1496181133206-80ce9b88a853", 700) },
  { key: "cameras", name: "Cameras", image: img("1502920917128-1aa500764cbd", 700) },
];

// ---- Products ----
// price/oldPrice in USD. rating 0-5. tag drives the little colored label.
export const products: Product[] = [
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Headphones",
    category: "headphones",
    brand: "SONY",
    price: 348,
    oldPrice: 399,
    rating: 4.8,
    reviews: 1240,
    tag: "Sale",
    image: img("1505740420928-5e560c06d30e"),
    blurb:
      "Industry-leading noise cancellation with two processors controlling eight microphones for unprecedented quiet and crystal-clear calls.",
  },
  {
    id: "bose-quietcomfort",
    name: "Bose QuietComfort Earbuds",
    category: "earbuds",
    brand: "BOSE",
    price: 279,
    oldPrice: 299,
    rating: 4.7,
    reviews: 860,
    tag: "Trending",
    image: img("1590658268037-6bf12165a8df"),
    blurb:
      "World-class noise cancellation and high-fidelity audio in a comfortable, secure-fit earbud built for all-day listening.",
  },
  {
    id: "garmin-fenix-8",
    name: "Garmin Fenix 8",
    category: "smartwatch",
    brand: "GARMIN",
    price: 449,
    oldPrice: 499,
    rating: 4.9,
    reviews: 512,
    tag: "New",
    image: img("1579586337278-3befd40fd17a"),
    blurb:
      "A rugged multisport GPS smartwatch with AMOLED display, built-in maps and up to 16 days of battery life.",
  },
  {
    id: "apple-watch-ultra",
    name: "Apple Watch Ultra 2",
    category: "smartwatch",
    brand: "APPLE",
    price: 799,
    oldPrice: 849,
    rating: 4.9,
    reviews: 2103,
    tag: "Popular",
    image: img("1546868871-7041f2a55e12"),
    blurb:
      "The most rugged and capable Apple Watch, with a bright 3000-nit display, precision dual-frequency GPS and 36-hour battery.",
  },
  {
    id: "jbl-tune-770nc",
    name: "JBL Tune 770NC",
    category: "headphones",
    brand: "JBL",
    price: 99,
    oldPrice: 129,
    rating: 4.5,
    reviews: 640,
    tag: "Trending",
    image: img("1546435770-a3e426bf472b"),
    blurb:
      "Adaptive noise cancelling headphones with JBL Pure Bass sound and a massive 70-hour battery life.",
  },
  {
    id: "logitech-mx-master",
    name: "Logitech MX Master 3S",
    category: "accessories",
    brand: "LOGITECH",
    price: 99,
    oldPrice: 119,
    rating: 4.8,
    reviews: 980,
    tag: "New",
    image: img("1527814050087-3793815479db"),
    blurb:
      "An iconic performance mouse with an 8K DPI sensor, quiet clicks and an ergonomic shape for all-day comfort.",
  },
  {
    id: "dji-osmo-pocket",
    name: "DJI Osmo Pocket 3",
    category: "cameras",
    brand: "DJI",
    price: 519,
    oldPrice: 549,
    rating: 4.7,
    reviews: 430,
    tag: "Popular",
    image: img("1502920917128-1aa500764cbd"),
    blurb:
      "A pocket-sized 3-axis stabilized camera with a 1-inch sensor and 4K/120fps video for cinematic footage anywhere.",
  },
  {
    id: "marshall-stanmore",
    name: "Marshall Stanmore III",
    category: "speakers",
    brand: "MARSHALL",
    price: 379,
    oldPrice: 419,
    rating: 4.6,
    reviews: 355,
    tag: "Trending",
    image: img("1612444530582-fc66183b16f7"),
    blurb:
      "A classic-styled stereo speaker delivering rich, room-filling sound with iconic Marshall design and analogue controls.",
  },
  {
    id: "sennheiser-momentum",
    name: "Sennheiser Momentum 4",
    category: "headphones",
    brand: "SENNHEISER",
    price: 299,
    oldPrice: 349,
    rating: 4.7,
    reviews: 720,
    tag: "Sale",
    image: img("1583394838336-acd977736f90"),
    blurb:
      "Audiophile-grade sound, adaptive noise cancellation and an astonishing 60-hour battery in a refined, comfortable design.",
  },
  {
    id: "jabra-elite-10",
    name: "Jabra Elite 10 Earbuds",
    category: "earbuds",
    brand: "JABRA",
    price: 199,
    oldPrice: 249,
    rating: 4.6,
    reviews: 540,
    tag: "New",
    image: img("1606220588913-b3aacb4d2f46"),
    blurb:
      "Dolby Atmos spatial sound and Jabra's most comfortable ergonomic fit, with advanced adaptive noise cancellation.",
  },
  {
    id: "samsung-galaxy-watch-7",
    name: "Samsung Galaxy Watch 7",
    category: "smartwatch",
    brand: "SAMSUNG",
    price: 299,
    oldPrice: 329,
    rating: 4.5,
    reviews: 610,
    tag: "New",
    image: img("1523275335684-37898b6baf30"),
    blurb:
      "Advanced health monitoring, a bright Super AMOLED display and seamless Galaxy ecosystem integration.",
  },
  {
    id: "gopro-hero-12",
    name: "GoPro Hero 12 Black",
    category: "cameras",
    brand: "GOPRO",
    price: 399,
    oldPrice: 449,
    rating: 4.7,
    reviews: 890,
    tag: "Popular",
    image: img("1526170375885-4d8ecf77b99f"),
    blurb:
      "5.3K video, HDR, and improved battery life in a waterproof, pocketable action camera built for adventure.",
  },
];

// ---- Homepage promo banner ----
export const promo: Promo = {
  title: "Time That Moves You. Style That Defines You.",
  cta: "Discover More",
  image: img("1579586337278-3befd40fd17a", 900),
};

// ---- "Why shop with us" feature strip ----
export const perks: Perk[] = [
  { icon: "Truck", title: "Free shipping on all orders" },
  { icon: "ShieldCheck", title: "Money-back guarantee" },
  { icon: "RefreshCw", title: "Free & easy 30-day return policy" },
];

// ---- Footer columns ----
export const footerCols: FooterColumn[] = [
  {
    title: "Categories",
    links: ["Headphones", "Earbuds", "Smart Watch", "Speakers", "Laptops"],
  },
  {
    title: "Shop",
    links: ["Best Sellers", "New Arrivals", "Top Rated", "Deals & Offers", "Gift Cards"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact Us", "Blog", "Press"],
  },
  {
    title: "Policy & Info",
    links: ["Shipping Policy", "Return Policy", "Privacy Policy", "Terms", "FAQ"],
  },
];
