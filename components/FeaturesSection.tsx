'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Activity, BarChart4, Music, HeartPulse } from "lucide-react";

export function FeaturesSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={containerRef} className="py-32 px-4 relative bg-spotify-black overflow-hidden min-h-[150vh]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                {/* Sticky Content */}
                <div className="sticky top-32 space-y-12 z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-6xl lg:text-8xl font-black text-white leading-tight">
                            Deep <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spotify-green to-sunset-orange text-tactile">
                                Insights
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-md">
                            Uncover hidden emotional patterns in your listening habits with our advanced audio analysis engine.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {[
                            { title: "Weekly Mood Timeline", icon: BarChart4, color: "text-spotify-green" },
                            { title: "Stress Pattern Detection", icon: HeartPulse, color: "text-sunset-magenta" },
                            { title: "Recovery Playlists", icon: Music, color: "text-sunset-violet" },
                            { title: "Long-term Trends", icon: Activity, color: "text-spotify-lime" },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-6 group cursor-pointer"
                            >
                                <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-clay-sm ${feature.color}`}>
                                    <feature.icon size={28} />
                                </div>
                                <span className="text-2xl font-bold text-gray-300 group-hover:text-white transition-colors">
                                    {feature.title}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Parallax Visuals */}
                <div className="relative space-y-24 pt-20">
                    <motion.div style={{ y: y1 }} className="tactile-card p-8 bg-gradient-to-br from-gray-900 to-black border-spotify-emerald/20">
                        <h3 className="text-2xl font-bold mb-6 text-white text-tactile">Weekly Mood</h3>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {[40, 65, 30, 85, 55, 90, 70].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                                    className="w-full bg-gradient-to-t from-spotify-green via-spotify-lime to-white/80 rounded-t-xl shadow-[0_0_20px_rgba(29,185,84,0.3)] relative group"
                                >
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div style={{ y: y2 }} className="tactile-card p-8 bg-gradient-to-bl from-gray-900 to-black border-sunset-magenta/20">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white text-tactile">Stress Detection</h3>
                            <div className="px-3 py-1 rounded-full bg-sunset-magenta/20 text-sunset-magenta text-xs font-bold border border-sunset-magenta/30">
                                LIVE
                            </div>
                        </div>

                        <div className="h-48 relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center gap-1 opacity-20">
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div key={i} className="flex-1 bg-sunset-magenta rounded-full animate-pulse-fast" style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.05}s` }} />
                                ))}
                            </div>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-32 h-32 rounded-full bg-gradient-to-tr from-sunset-magenta to-sunset-orange shadow-[0_0_60px_rgba(255,78,219,0.4)] flex items-center justify-center z-10 border-4 border-white/10 backdrop-blur-sm"
                            >
                                <span className="text-4xl font-black text-white font-mono">LOW</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div className="tactile-card p-0 overflow-hidden group">
                        <div className="h-40 bg-gradient-to-r from-sunset-violet to-indigo-600 relative p-6">
                            <Music className="text-white/20 absolute top-4 right-4 w-24 h-24 rotate-12" />
                            <h3 className="text-3xl font-black text-white relative z-10 pt-8">Recovery Mix</h3>
                            <p className="text-white/80 relative z-10">Generated just now</p>
                        </div>
                        <div className="p-6 bg-white/5 space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded bg-gray-700" />
                                    <div className="flex-1">
                                        <div className="h-3 w-32 bg-gray-600 rounded mb-2" />
                                        <div className="h-2 w-20 bg-gray-700 rounded" />
                                    </div>
                                    <span className="text-gray-500 text-sm">3:42</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
