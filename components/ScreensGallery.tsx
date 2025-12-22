'use client'

import { motion } from "framer-motion";
import Image from "next/image";

const screens = [
    { id: 1, title: "Dashboard", image: "/gallery_dashboard.png", rotate: -6 },
    { id: 2, title: "Mood Insights", image: "/gallery_insights.png", rotate: 3 },
    { id: 3, title: "Playlist Gen", image: "/gallery_playlists.png", rotate: -4 },
    { id: 4, title: "Trends", image: "/gallery_trends.png", rotate: 6 },
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
                            <div className="w-full h-full rounded-[32px] overflow-hidden bg-black relative">
                                <Image
                                    src={screen.image}
                                    alt={screen.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
