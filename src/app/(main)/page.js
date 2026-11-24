import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCollection />
      <WhyChooseUs/>
      <Testimonials/>
    </div>
  );
}
