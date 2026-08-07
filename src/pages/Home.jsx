import Hero from "../components/Hero";
import BrandStrip from "../components/BrandStrip";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import PromoBanner from "../components/PromoBanner";
import NewArrivals from "../components/NewArrivals";
import PerksStrip from "../components/PerksStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <Categories />
      <BestSellers />
      <PromoBanner />
      <NewArrivals />
      <PerksStrip />
    </>
  );
}
