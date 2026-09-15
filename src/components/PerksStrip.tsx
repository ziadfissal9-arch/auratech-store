import { Truck, ShieldCheck, RefreshCw, type LucideIcon } from "lucide-react";
import { perks } from "../data";

const ICONS: Record<string, LucideIcon> = { Truck, ShieldCheck, RefreshCw };

export default function PerksStrip() {
  return (
    <section className="section">
      <div className="perks">
        {perks.map((p) => {
          const Icon = ICONS[p.icon];
          return (
            <div className="perk" key={p.title}>
              <span className="perk-icon">
                <Icon size={20} />
              </span>
              <span>{p.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
