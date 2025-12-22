'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Sparkles, History, Music2, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Insights', href: '/dashboard/insights', icon: Sparkles },
    { name: 'Timeline', href: '/dashboard/timeline', icon: History },
    { name: 'Playlists', href: '/dashboard/playlists', icon: Music2 },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-full flex items-center gap-1 pointer-events-auto transition-all hover:border-white/20 shadow-2xl"
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-bg"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon size={18} className={isActive ? 'text-spotify-green' : ''} />
                            <span className="relative z-10">{item.name}</span>
                        </Link>
                    );
                })}

                <div className="w-px h-6 bg-white/10 mx-2" />

                <Link href="/dashboard/settings" className={`p-2.5 rounded-full transition-all ${pathname === '/dashboard/settings' ? 'text-spotify-green bg-white/10' : 'text-gray-400 hover:text-white'}`}>
                    <Settings size={20} />
                </Link>

                <button
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/';
                    }}
                    className="p-2.5 rounded-full text-gray-400 hover:text-red-400 transition-all"
                >
                    <LogOut size={20} />
                </button>
            </motion.div>
        </nav>
    );
}
