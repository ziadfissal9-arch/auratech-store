import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReveal } from "../hooks";

const HERO_IMG =
  "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=900&q=85&auto=format&fit=crop";

export default function Hero() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="hero">
      <div className="hero-inner reveal" ref={ref}>
        <div className="hero-copy">
          <span className="hero-eyebrow">New Season Collection</span>

          <h1>
            Elevate
            <br />
            Your Audio
            <br />
            Experience
          </h1>

          <p>
            Explore premium headphones, smartwatches, and cutting-edge audio
            gear. Unmatched quality, delivered to your doorstep.
          </p>

          <Link to="/shop" className="btn btn-primary btn-lg">
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>

        <div className="hero-media">
          <img src={HERO_IMG} alt="Woman enjoying premium headphones" />
        </div>
      </div>
    </section>
  );
}
