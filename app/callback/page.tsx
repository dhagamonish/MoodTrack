'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function CallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    useEffect(() => {
        // Handle Implicit Grant (Hash)
        const hash = window.location.hash;
        if (hash) {
            const token = new URLSearchParams(hash.substring(1)).get('access_token');
            if (token) {
                localStorage.setItem('spotify_token', token);
                setTimeout(() => router.push('/dashboard'), 1500);
            }
        }

        // Handle Auth Code Error (Query)
        if (error) {
            console.error("Auth Error:", error);
        }
    }, [error, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-spotify-green/20 rounded-full blur-[120px] animate-pulse-fast pointer-events-none" />

            {error ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 bg-black/40 backdrop-blur-xl border border-red-500/30 p-8 rounded-3xl shadow-tactile"
                >
                    <h1 className="text-3xl font-bold text-red-400 mb-2">Connection Failed</h1>
                    <p className="text-gray-300">Spotify access was denied or an error occurred.</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 flex flex-col items-center"
                >
                    <div className="w-24 h-24 bg-spotify-green rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(29,185,84,0.4)] mb-8 animate-bounce-slow">
                        <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 text-tactile">
                        Connecting...
                    </h1>
                    <p className="text-xl text-gray-400">Analyzing your emotional resonance.</p>
                </motion.div>
            )}
        </div>
    );
}

export default function CallbackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
            <CallbackContent />
        </Suspense>
    );
}
