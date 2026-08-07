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
const SOCIALS = [Facebook, Twitter, Instagram, Youtube, Linkedin];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-watermark" aria-hidden="true">
        AURATECH
      </div>

      <div className="footer-inner">
        <div className="footer-brand">
          <Logo light />
          <p>Premium audio gear for your everyday lifestyle.</p>
          <div className="footer-socials">
            {SOCIALS.map((Icon, i) => (
              <a href="#" key={i} aria-label="social link" className="social-dot">
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
        <span>Copyright © Auratech 2026. All Rights Reserved.</span>
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
