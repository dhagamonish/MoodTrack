'use client'

import { motion } from "framer-motion";

const screens = [
    { id: 1, title: "Dashboard", color: "bg-spotify-green", rotate: -6 },
    { id: 2, title: "Mood Insights", color: "bg-sunset-violet", rotate: 3 },
    { id: 3, title: "Playlist Gen", color: "bg-sunset-orange", rotate: -4 },
    { id: 4, title: "Trends", color: "bg-spotify-lime", rotate: 6 },
];

export function ScreensGallery() {
    return (
        <section className="py-32 px-4 bg-spotify-black overflow-hidden relative">
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

            <div className="text-center mb-24 relative z-10">
                <h2 className="text-6xl lg:text-8xl font-black text-white text-tactile uppercase">
                    App <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-violet to-sunset-magenta">Gallery</span>
                </h2>
            </div>

            <div className="max-w-[1920px] mx-auto relative h-[600px] lg:h-[800px] flex justify-center items-center perspective-1000">
                <div className="relative w-full h-full flex items-center justify-center">
                    {screens.map((screen, i) => (
                        <motion.div
                            key={screen.id}
                            initial={{ opacity: 0, y: 100, rotate: 0 }}
                            whileInView={{ opacity: 1, y: 0, rotate: screen.rotate }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                            viewport={{ once: true }}
                            className={`absolute w-[300px] lg:w-[400px] aspect-[9/19] rounded-[40px] border-[8px] border-gray-900 bg-gray-900 shadow-2xl z-${i * 10}`}
                            style={{
                                left: `${50 + (i - 1.5) * 15}%`,
                                transform: `translateX(-50%) rotate(${screen.rotate}deg)`,
                                marginTop: i % 2 === 0 ? '-50px' : '50px'
                            }}
                            whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                        >
                            {/* Screen Content Mock */}
                            <div className="w-full h-full rounded-[32px] overflow-hidden bg-black relative">
                                <div className="absolute top-0 w-full h-8 bg-black/50 backdrop-blur-md z-10 flex justify-center pt-2">
                                    <div className="w-20 h-4 bg-black rounded-full" />
                                </div>

                                {/* Mock UI */}
                                <div className="p-6 pt-12 space-y-6">
                                    <div className="h-8 w-2/3 bg-gray-800 rounded-lg animate-pulse" />
                                    <div className={`h-40 w-full rounded-2xl ${screen.color} opacity-20`} />
                                    <div className="space-y-3">
                                        <div className="h-16 w-full rounded-xl bg-white/10" />
                                        <div className="h-16 w-full rounded-xl bg-white/10" />
                                        <div className="h-16 w-full rounded-xl bg-white/10" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
