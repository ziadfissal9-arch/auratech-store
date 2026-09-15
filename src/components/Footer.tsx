import { Link } from "react-router-dom";
import { footerCols } from "../data";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "./SocialIcons";
import Logo from "./Logo";

// Brand-color logos aren't needed here; inline monochrome glyphs (lucide v1 dropped brand icons).
const SOCIALS = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Linkedin, label: "LinkedIn" },
];
const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo light />
          <p>Premium audio gear for your everyday lifestyle.</p>
          <div className="footer-socials">
            {SOCIALS.map(({ Icon, label }) => (
              <a href="#" key={label} aria-label={label} className="social-dot">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {footerCols.map((col) => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l}>
                  <Link to="/shop">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>Copyright © Auratech {YEAR}. All Rights Reserved.</span>
        <div className="pay-methods">
          {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
            <span className="pay-chip" key={p}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
