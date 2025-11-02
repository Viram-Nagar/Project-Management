import CTASection from "../../components/landing/CTASection";
import FeaturesSection from "../../components/landing/FeatureSection";
import Footer from "../../components/landing/Footer";
import HeroSection from "../../components/landing/HeroSection";
import ShowcaseSection from "../../components/landing/ShowcaseSection";
import TestimonialsSection from "../../components/landing/Testimonial";
import Header from "../../components/layout/Header";

function LandingPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default LandingPage;
