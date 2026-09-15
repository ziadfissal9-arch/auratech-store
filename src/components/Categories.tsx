import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { categories } from "../data";
import { useReveal } from "../hooks";

export default function Categories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const revealRef = useReveal<HTMLDivElement>();
  const navigate = useNavigate();

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="section categories">
      <div className="section-head">
        <h2>Most Popular Categories</h2>
        <div className="carousel-nav">
          <button aria-label="Scroll left" onClick={() => scroll(-1)}>
            <ArrowLeft size={18} />
          </button>
          <button aria-label="Scroll right" onClick={() => scroll(1)}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="cat-track reveal" ref={revealRef}>
        <div className="cat-scroll" ref={trackRef}>
          {categories.map((c) => (
            <button
              key={c.key}
              className="cat-card"
              onClick={() => navigate(`/shop/${c.key}`)}
              style={{ backgroundImage: `url(${c.image})` }}
            >
              <span className="cat-overlay" />
              <span className="cat-name">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
