import { useEffect, useRef, useState } from "react";

// Adds an "in-view" class the first time an element scrolls into view,
// used to drive the CSS reveal animations.
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// Formats a number as USD currency, e.g. 348 -> "$348.00".
export function usd(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Small helper for "scroll to top on route change".
export function useScrollTopOnMount() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) {
      window.scrollTo(0, 0);
      setMounted(true);
    }
  }, [mounted]);
}
