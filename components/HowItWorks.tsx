'use client'

import { motion } from "framer-motion";
import { ShieldCheck, Activity, Smile } from "lucide-react";

const cards = [
    {
        title: "Connect Spotify",
        description: "Secure OAuth 2.0 PKCE login grants access to your listening history.",
        icon: ShieldCheck,
        color: "text-spotify-green",
        badge: "OAuth 2.0 PKCE",
        delay: 0
    },
    {
        title: "Analyze Emotion",
        description: "We process audio features: valence, energy, and tempo to map your mood.",
        icon: Activity,
        color: "text-sunset-violet",
        badge: "Audio Features API",
        delay: 0.2
    },
    {
        title: "Improve Mood",
        description: "Get personalized recovery playlists to lift your spirits instantly.",
        icon: Smile,
        color: "text-sunset-orange",
        badge: "Recommendation Engine",
        delay: 0.4
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 px-4 bg-black/40 relative">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl lg:text-7xl font-black text-center text-white mb-20 text-tactile"
                >
                    How it <span className="text-spotify-green">Works</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: card.delay, type: "spring", stiffness: 100 }}
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            className="tactile-card p-8 flex flex-col items-center text-center group border-t border-white/20"
                        >
                            <div className={`p-5 rounded-full bg-white/5 shadow-inner mb-6 ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon size={48} strokeWidth={2.5} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                            <p className="text-gray-400 mb-6 font-medium">{card.description}</p>

                            <div className="mt-auto px-4 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-white/50 tracking-wider shadow-sm uppercase">
                                {card.badge}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
