import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { DemoSection } from "@/components/DemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TechnicalSection } from "@/components/TechnicalSection";
import { ScreensGallery } from "@/components/ScreensGallery";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col overflow-x-hidden">
            <HeroSection />
            <HowItWorks />
            <DemoSection />
            <FeaturesSection />
            <TechnicalSection />
            <ScreensGallery />
            <Testimonials />
            <Pricing />
            <FinalCTA />
            <Footer />
        </main>
    )
}
