import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { DemoSection } from "@/components/DemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TechnicalSection } from "@/components/TechnicalSection";
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
            <FinalCTA />
            <Footer />
        </main>
    )
}
