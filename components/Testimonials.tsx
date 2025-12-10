'use client'

import { motion } from "framer-motion";

const testimonials = [
    { text: "MoodTrack changed how I see my music library. It's scary accurate.", author: "Alex D.", role: "Spotify User" },
    { text: "The stress detection alerts literally saved my week. Highly recommend.", author: "Sarah M.", role: "Pro Member" },
    { text: "Finally, a mental health app that doesn't feel like a chore. Love the vibe.", author: "Jamal K.", role: "Music Producer" },
];

export function Testimonials() {
    return (
        <section className="py-24 px-4 bg-spotify-black relative">
            <div className="max-w-6xl mx-auto space-y-16">
                <h2 className="text-4xl lg:text-5xl font-black text-center text-white text-tactile">
                    Community <span className="text-gradient from-spotify-green to-spotify-lime">Love</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                            className="tactile-card p-8 bg-gray-900 border border-white/5"
                        >
                            <div className="mb-6 flex gap-1">
                                {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-5 h-5 bg-spotify-green rounded-full shadow-[0_0_10px_rgba(29,185,84,0.5)]" />)}
                            </div>
                            <p className="text-xl text-gray-200 font-medium mb-6">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 border border-white/20" />
                                <div>
                                    <div className="font-bold text-white">{t.author}</div>
                                    <div className="text-sm text-spotify-green">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
