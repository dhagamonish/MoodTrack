'use client'

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const messages = [
    {
        id: 1,
        sender: "MoodTrack AI",
        text: "You've listened to low-valence songs five nights this week.",
        isAi: true,
    },
    {
        id: 2,
        sender: "User",
        text: "Yeah, it's been a rough week. What should I do?",
        isAi: false,
    },
    {
        id: 3,
        sender: "MoodTrack AI",
        text: "Here’s a 10-minute positivity playlist made just for you. 🎵",
        isAi: true,
        attachment: "Playlist: Uplift Mix"
    }
];

export function DemoSection() {
    return (
        <section className="py-32 px-4 relative overflow-hidden bg-spotify-black">
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-30 animate-pulse-slow" />
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-tactile relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-spotify-green via-spotify-lime to-sunset-violet" />

                    <div className="space-y-8">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: msg.isAi ? -50 : 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.5, type: "spring" }}
                                className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'} items-end gap-4`}
                            >
                                {msg.isAi && (
                                    <div className="w-10 h-10 rounded-full bg-spotify-green flex items-center justify-center font-bold text-black border-2 border-white/20 shadow-lg">
                                        AI
                                    </div>
                                )}

                                <div className={`
                    max-w-[80%] p-6 rounded-3xl backdrop-blur-md shadow-glass relative
                    ${msg.isAi
                                        ? 'bg-white/10 text-white rounded-bl-none border border-white/5'
                                        : 'bg-spotify-green text-black rounded-br-none font-medium shadow-puffy'}
                  `}>
                                    <p className="text-lg leading-snug">{msg.text}</p>
                                    {msg.attachment && (
                                        <div className="mt-4 p-3 bg-black/20 rounded-xl flex items-center gap-3 border border-white/5">
                                            <div className="w-10 h-10 bg-gradient-to-br from-sunset-violet to-sunset-magenta rounded-lg shadow-inner" />
                                            <span className="text-sm font-semibold opacity-90">{msg.attachment}</span>
                                        </div>
                                    )}
                                </div>

                                {!msg.isAi && (
                                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden">
                                        <span className="text-xs text-white">ME</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area Fake */}
                    <div className="mt-12 relative">
                        <div className="h-16 bg-black/40 rounded-full border border-white/10 flex items-center px-6 text-white/30 backdrop-blur-sm">
                            Type a message...
                        </div>
                        <div className="absolute right-2 top-2 p-3 bg-spotify-green rounded-full text-black shadow-lg">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
