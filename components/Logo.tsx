'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Logo() {
    return (
        <Link href="/" className="absolute top-4 left-4 md:top-5 md:left-8 z-[100] flex items-center group">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-[140px] h-[35px] md:w-[230px] md:h-[58px]"
            >
                <Image
                    src="/logo.png"
                    alt="MoodTrack Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </motion.div>
        </Link>
    );
}
