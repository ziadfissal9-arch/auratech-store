import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { promo } from "../data";
import { useReveal } from "../hooks";

export default function PromoBanner() {
  const ref = useReveal();
  return (
    <section className="section">
      <div className="promo reveal" ref={ref}>
        <div className="promo-copy">
          <h2>{promo.title}</h2>
          <Link to="/shop/smartwatch" className="btn btn-light btn-sm">
            {promo.cta} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="promo-media">
          <img src={promo.image} alt="Featured smartwatch" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
