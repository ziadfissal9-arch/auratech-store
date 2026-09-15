import { Star } from "lucide-react";

interface StarsProps {
  rating?: number;
  size?: number;
}

// Renders a 5-star row with partial fill based on a 0-5 rating.
export default function Stars({ rating = 0, size = 14 }: StarsProps) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="star-wrap" style={{ width: size, height: size }}>
            <Star size={size} className="star-bg" />
            <span className="star-fill" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="star-fg" />
            </span>
          </span>
        );
      })}
    </span>
  );
}
