'use client'

import { motion } from "framer-motion";
import { Code, Database, Server, Smartphone, Lock, CloudLightning } from "lucide-react";

export function TechnicalSection() {
    return (
        <section className="py-32 px-4 bg-spotify-black relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
                <div className="text-center space-y-4">
                    <h2 className="text-5xl lg:text-7xl font-black text-white text-tactile uppercase tracking-tighter">
                        Under the <span className="text-spotify-green">Hood</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Powered by Spotify Web API, OAuth 2.0 PKCE, and advanced audio feature extraction.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Auth Flow Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="tactile-card p-10 bg-gray-900 border-l-4 border-spotify-green"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <Lock className="text-spotify-green" size={32} />
                            <h3 className="text-2xl font-bold text-white">PKCE Authentication</h3>
                        </div>

                        <div className="space-y-4 font-mono text-sm relative">
                            <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-700" />

                            {[
                                { step: "Generate code_verifier", icon: "🔑" },
                                { step: "Create code_challenge (SHA-256)", icon: "🛡️" },
                                { step: "Redirect to Spotify Auth", icon: "👉" },
                                { step: "Retrieve auth code", icon: "📥" },
                                { step: "Exchange for access_token", icon: "🎫" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 relative z-10 bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-sm"
                                >
                                    <div className="w-6 h-6 flex items-center justify-center text-lg">{item.icon}</div>
                                    <span className="text-gray-300">{item.step}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* API Endpoints */}
                    <div className="space-y-6">
                        {[
                            { ep: "/v1/me/top/tracks", desc: "Extracts valence & energy", color: "text-spotify-lime" },
                            { ep: "/v1/audio-features", desc: "Analyzes tempo & acousticness", color: "text-sunset-violet" },
                            { ep: "/v1/recommendations", desc: "Generates recovery playlist", color: "text-sunset-orange" },
                        ].map((api, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02, x: 10 }}
                                className="tactile-card p-6 flex items-center justify-between border-l-4 border-transparent hover:border-white transition-all bg-gray-900/50"
                            >
                                <div className="flex items-center gap-4">
                                    <CloudLightning size={24} className={api.color} />
                                    <div>
                                        <div className="font-mono text-white font-bold text-lg">{api.ep}</div>
                                        <div className="text-gray-500 text-sm">{api.desc}</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 rounded bg-white/10 text-xs font-mono text-white/50">GET</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Architecture Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="tactile-card p-12 bg-black/40 border border-white/10 text-center relative overflow-hidden"
                >
                    <h3 className="text-2xl font-bold text-white mb-12 relative z-10">System Architecture</h3>
                    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 relative z-10">
                        <div className="p-6 bg-gray-800 rounded-2xl border border-white/10 shadow-tactile w-40 flex flex-col items-center">
                            <Smartphone size={40} className="text-white mb-4" />
                            <span className="font-bold text-white">Client</span>
                            <span className="text-xs text-gray-500 mt-1">Next.js / Framer</span>
                        </div>

                        <div className="w-20 h-1 bg-gradient-to-r from-gray-700 to-spotify-green rounded-full animate-pulse" />

                        <div className="p-6 bg-gray-800 rounded-2xl border border-white/10 shadow-tactile w-40 flex flex-col items-center relative">
                            <div className="absolute -top-3 -right-3 w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center text-black text-xs font-bold animate-bounce">
                                AI
                            </div>
                            <Server size={40} className="text-white mb-4" />
                            <span className="font-bold text-white">Engine</span>
                            <span className="text-xs text-gray-500 mt-1">Mood Analysis</span>
                        </div>

                        <div className="w-20 h-1 bg-gradient-to-r from-spotify-green to-gray-700 rounded-full animate-pulse" />

                        <div className="p-6 bg-gray-800 rounded-2xl border border-white/10 shadow-tactile w-40 flex flex-col items-center">
                            <Database size={40} className="text-white mb-4" />
                            <span className="font-bold text-white">Spotify</span>
                            <span className="text-xs text-gray-500 mt-1">Web API</span>
                        </div>
                    </div>

                    {/* Connecting Glows */}
                    <div className="absolute inset-x-0 top-1/2 h-32 bg-spotify-green/5 blur-3xl -z-10" />
                </motion.div>
            </div>
        </section>
    )
}
