'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Music2 } from "lucide-react";

export function HeroSection() {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/callback';

        if (!clientId) {
            alert("Setup Required: Please add your NEXT_PUBLIC_SPOTIFY_CLIENT_ID to .env.local");
            return;
        }

        const scope = 'user-read-private user-read-email user-top-read user-read-recently-played';
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
        });

        window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-4 lg:px-20">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-spotify-green/20 rounded-full blur-[120px] animate-pulse-fast pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sunset-violet/20 rounded-full blur-[140px] animate-wobble-slow pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto z-10 w-full">
                {/* Left Column: Text */}
                <div className="flex flex-col gap-8 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-7xl lg:text-[7rem] font-black leading-[0.9] text-white tracking-tighter text-tactile drop-shadow-2xl">
                            Feel your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spotify-green via-spotify-lime to-sunset-violet">
                                emotions
                            </span>
                            <br />
                            through music.
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl lg:text-2xl text-gray-300 max-w-xl font-medium"
                    >
                        MoodTrack analyzes your Spotify listening habits to reveal emotional patterns and guide your wellbeing.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start"
                    >
                        <Button
                            size="xl"
                            variant="clay"
                            onClick={handleLogin}
                            className="w-full sm:w-auto hover:neon-glow relative overflow-hidden group"
                        >
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                            Connect Spotify
                            <Music2 className="ml-3 w-6 h-6" />
                        </Button>
                        <Button size="xl" variant="ghost" className="w-full sm:w-auto border-2 border-white/10 text-white hover:bg-white/5 backdrop-blur-md transition-all duration-300 group">
                            See Demo
                            <Play className="ml-3 w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                        </Button>
                    </motion.div>
                </div>

                {/* Right Column: 3D Mockups */}
                <div className="relative h-[600px] w-full perspective-1000 hidden lg:flex items-center justify-center">
                    <motion.div
                        className="relative w-[320px] h-[640px] bg-black rounded-[50px] border-[8px] border-gray-900 shadow-tactile z-20"
                        animate={{ y: [-20, 20, -20], rotateY: [-5, 5, -5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Screen Content - Glass Layer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-[42px] overflow-hidden">
                            {/* Mock UI Header */}
                            <div className="h-24 bg-spotify-emerald/30 backdrop-blur-md flex items-center px-6 pt-8">
                                <div className="w-12 h-12 rounded-full bg-spotify-green/20 border border-spotify-green/50 flex items-center justify-center text-spotify-green font-bold text-xl">
                                    M
                                </div>
                                <div className="ml-4 flex-1 h-3 bg-white/10 rounded-full w-20" />
                            </div>

                            {/* Mock Charts */}
                            <div className="p-6 space-y-6">
                                <div className="h-40 bg-white/5 rounded-3xl border border-white/10 p-4 relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-spotify-green/20 to-transparent flex items-end justify-around px-2 pb-2">
                                        {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                            <div key={i} style={{ height: `${h}%` }} className="w-3 bg-spotify-green rounded-t-full shadow-[0_0_10px_rgba(29,185,84,0.5)]" />
                                        ))}
                                    </div>
                                    <div className="text-white/60 text-sm font-semibold mb-2">Weekly Valence</div>
                                </div>

                                <div className="h-32 bg-gradient-to-br from-sunset-violet/20 to-sunset-magenta/20 rounded-3xl border border-white/10 flex items-center justify-center relative shadow-inner">
                                    <div className="absolute inset-0 bg-noise opacity-20" />
                                    <div className="text-center z-10">
                                        <div className="text-4xl font-bold text-white mb-1">Low Energy</div>
                                        <div className="text-sm text-white/50">Mood Trend</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Overlay Card */}
                            <motion.div
                                className="absolute bottom-20 -right-16 w-48 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center p-3 shadow-glass"
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center shadow-lg">
                                    <Music2 size={18} className="text-black" />
                                </div>
                                <div className="ml-3">
                                    <div className="h-2 w-20 bg-white/40 rounded-full mb-1" />
                                    <div className="h-2 w-12 bg-white/20 rounded-full" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Phone Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[42px] pointer-events-none" />
                    </motion.div>

                    {/* Background Floating Elements */}
                    <motion.div
                        className="absolute top-20 right-10 w-64 h-64 bg-spotify-emerald/30 rounded-full blur-3xl -z-10"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </div>
            </div>
        </section>
    );
}
