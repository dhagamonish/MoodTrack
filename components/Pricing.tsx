'use client'

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export function Pricing() {
    return (
        <section className="py-32 px-4 bg-spotify-black relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Free Tier */}
                <motion.div
                    whileHover={{ y: -10 }}
                    className="tactile-card p-10 bg-gray-900 border border-white/10 relative"
                >
                    <h3 className="text-3xl font-black text-white mb-2">Free Stats</h3>
                    <div className="text-5xl font-black text-spotify-green mb-8">$0<span className="text-xl text-gray-500">/mo</span></div>

                    <ul className="space-y-4 mb-10">
                        {['Weekly Mood Report', 'Basic Insights', '1 Recovery Playlist/wk'].map(f => (
                            <li key={f} className="flex items-center gap-3 text-gray-300">
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-spotify-green"><Check size={14} /></div>
                                {f}
                            </li>
                        ))}
                    </ul>

                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl h-14 font-bold text-lg">
                        Get Started
                    </Button>
                </motion.div>

                {/* Pro Tier */}
                <motion.div
                    whileHover={{ y: -10 }}
                    className="tactile-card p-12 bg-gradient-to-b from-gray-800 to-black border-2 border-spotify-green shadow-[0_20px_60px_-15px_rgba(29,185,84,0.3)] relative scale-105"
                >
                    <div className="absolute top-0 right-0 bg-spotify-green text-black text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                        Most Popular
                    </div>

                    <h3 className="text-4xl font-black text-white mb-2">Pro Mind</h3>
                    <div className="text-6xl font-black text-white mb-8">$4<span className="text-xl text-gray-500">/mo</span></div>

                    <ul className="space-y-4 mb-12">
                        {['Unlimited Daily Insights', 'Stress Pattern Detection', 'Full Playlist Automation', 'Early Access Features'].map(f => (
                            <li key={f} className="flex items-center gap-3 text-white font-medium">
                                <div className="w-6 h-6 rounded-full bg-spotify-green flex items-center justify-center text-black"><Check size={14} strokeWidth={3} /></div>
                                {f}
                            </li>
                        ))}
                    </ul>

                    <Button variant="clay" className="w-full h-16 text-xl rounded-2xl shadow-puffy">
                        Start Free Trial
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
