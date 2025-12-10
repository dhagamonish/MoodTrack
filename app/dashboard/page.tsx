'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Music2, User, LogOut, Activity } from 'lucide-react';

interface SpotifyProfile {
    display_name: string;
    images: { url: string }[];
}

interface SpotifyTrack {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
}

export default function Dashboard() {
    const router = useRouter();
    const [profile, setProfile] = useState<SpotifyProfile | null>(null);
    const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
    const [loading, setLoading] = useState(true);
    const [mood, setMood] = useState({ label: "Analyzing...", color: "from-gray-500 to-gray-700" });

    useEffect(() => {
        const token = localStorage.getItem('spotify_token');
        if (!token) {
            router.push('/');
            return;
        }

        async function fetchData() {
            try {
                // Fetch Profile
                const profileRes = await fetch('https://api.spotify.com/v1/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const profileData = await profileRes.json();
                setProfile(profileData);

                // Fetch Top Tracks
                const tracksRes = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const tracksData = await tracksRes.json();
                setTopTracks(tracksData.items || []);

                // Simulate Mood Analysis based on tracks directly (Mockup logic for visual impact)
                if (tracksData.items?.length > 0) {
                    // Randomly deterministic mood based on first track ID char to keep it consistent but 'dynamic'
                    const moodType = tracksData.items[0].name.length % 3;
                    if (moodType === 0) setMood({ label: "High Energy ⚡", color: "from-spotify-green to-spotify-lime" });
                    else if (moodType === 1) setMood({ label: "Deep Focus 🌊", color: "from-blue-500 to-purple-600" });
                    else setMood({ label: "Chill Vibes 🍃", color: "from-emerald-400 to-teal-500" });
                }

                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch spotify data", err);
                localStorage.removeItem('spotify_token');
                router.push('/');
            }
        }

        fetchData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('spotify_token');
        router.push('/');
    };

    if (loading) return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-spotify-green/30 border-t-spotify-green rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-6 pb-20 overflow-x-hidden relative">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-spotify-green/10 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        {profile?.images?.[0]?.url ? (
                            <img src={profile.images[0].url} alt="Profile" className="w-12 h-12 rounded-full border-2 border-spotify-green shadow-[0_0_15px_rgba(29,185,84,0.5)]" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border-2 border-white/10">
                                <User size={20} />
                            </div>
                        )}
                        <div>
                            <h2 className="text-sm text-gray-400 uppercase tracking-widest font-bold">Welcome back</h2>
                            <h1 className="text-2xl font-black text-white">{profile?.display_name}</h1>
                        </div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-white hover:bg-white/5">
                        <LogOut size={16} className="mr-2" />
                        Disconnect
                    </Button>
                </header>

                {/* Mood Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`rounded-[40px] p-10 bg-gradient-to-br ${mood.color} relative overflow-hidden shadow-tactile mb-12 border border-white/10`}
                >
                    <div className="absolute inset-0 bg-noise opacity-20" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2 opacity-80">
                            <Activity size={20} />
                            <span className="font-bold tracking-wider text-sm uppercase">Current Resonance</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg tracking-tighter">
                            {mood.label}
                        </h2>
                        <p className="mt-4 text-white/80 max-w-lg text-lg font-medium leading-relaxed">
                            Based on your recent listening, you are gravitating towards sounds that amplify this emotional state.
                        </p>
                    </div>
                </motion.div>

                {/* Top Tracks */}
                <div>
                    <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2">
                        <Music2 size={24} className="text-spotify-green" />
                        Your Sonic Signature
                    </h3>

                    <div className="grid gap-4">
                        {topTracks.map((track, i) => (
                            <motion.div
                                key={track.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default hover:border-spotify-green/30 hover:shadow-[0_0_20px_rgba(29,185,84,0.1)]"
                            >
                                <span className="text-2xl font-black text-white/20 w-8 text-center">{i + 1}</span>
                                <img src={track.album.images[0]?.url} alt={track.name} className="w-16 h-16 rounded-xl shadow-lg group-hover:scale-105 transition-transform" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-lg font-bold text-white truncate">{track.name}</h4>
                                    <p className="text-sm text-gray-400 truncate">{track.artists.map(a => a.name).join(', ')}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Music2 size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
