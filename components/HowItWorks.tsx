'use client'

import { motion } from "framer-motion";
import { ShieldCheck, Activity, Smile, Music2 } from "lucide-react";

const cards = [
    {
        title: "Connect Spotify",
        description: "Secure login grants access to your listening history. No passwords shared.",
        icon: ShieldCheck,
        color: "text-spotify-green",
        badge: "Private & Secure",
        delay: 0
    },
    {
        title: "Analyze Behavior",
        description: "We extract audio features from your history: valence, energy, and tempo.",
        icon: Activity,
        color: "text-sunset-violet",
        badge: "Sonic Analysis",
        delay: 0.1
    },
    {
        title: "Detect Patterns",
        description: "Identify stress signatures, burnout signals, and emotional trends.",
        icon: Smile,
        color: "text-sunset-orange",
        badge: "Pattern Detection",
        delay: 0.2
    },
    {
        title: "Suggest Actions",
        description: "Get personalized recovery playlists and mindful listening routines.",
        icon: Music2,
        color: "text-spotify-lime",
        badge: "Recovery Tools",
        delay: 0.3
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

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100
                                    }
                                }
                            }}
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
                </motion.div>
            </div>
        </section>
    )
}
