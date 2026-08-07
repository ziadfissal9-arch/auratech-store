import { brands } from "../data";

// The greyed-out brand wordmark row under the hero.
export default function BrandStrip() {
  return (
    <section className="brand-strip">
      <div className="brand-strip-inner">
        {brands.map((b) => (
          <span className="brand-word" key={b}>
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
