import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import InstructorsSection from "@/components/InstructorsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      {/* <FeaturesSection /> */}
      {/* <InstructorsSection /> */}
      <TestimonialsSection />
      {/* <BlogSection /> */}
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;