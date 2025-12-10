'use client'

import { Button } from "@/components/ui/button";

export function FinalCTA() {
    return (
        <section className="py-40 px-4 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-spotify-green via-black to-sunset-violet opacity-80" />
            <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

            <div className="relative z-10 text-center space-y-10 max-w-4xl mx-auto">
                <h2 className="text-7xl lg:text-9xl font-black text-white text-tactile leading-tight drop-shadow-2xl">
                    Start Feeling <br /> Better Today.
                </h2>
                <Button size="xl" variant="clay" className="hover:scale-110 transition-transform duration-300 shadow-[0_0_50px_rgba(29,185,84,0.6)] border-4 border-white/20">
                    Connect Spotify
                </Button>
            </div>
        </section>
    )
}
