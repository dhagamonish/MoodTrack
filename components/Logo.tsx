'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Logo() {
    return (
        <Link href="/" className="fixed top-8 left-8 z-[100] flex items-center gap-3 group">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 md:w-16 md:h-16"
            >
                <Image
                    src="/logo.png"
                    alt="MoodTrack Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </motion.div>
            <span className="text-xl font-black tracking-tighter text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                MoodTrack
            </span>
        </Link>
    );
}
