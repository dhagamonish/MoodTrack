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
    const [mood, setMood] = useState({ label: "Analyzing...", color: "from-gray-500 to-gray-700", description: "Connecting to your sonic consciousness..." });

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

                // Fetch Top Tracks (medium_term is more reliable for most users)
                const tracksRes = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=medium_term', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const tracksData = await tracksRes.json();
                const tracks = tracksData.items || [];
                setTopTracks(tracks.slice(0, 5)); // Show top 5 but calculate from 20 to ensure data density

                if (tracks.length > 0) {
                    // 1. Get IDs of all tracks for deep analysis
                    const trackIds = tracks.map((t: SpotifyTrack) => t.id).join(',');

                    // 2. Fetch Audio Features
                    const featuresRes = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const featuresData = await featuresRes.json();
                    const features = featuresData.audio_features || [];

                    // 3. Calculate Averages with precision across 6 distinct dimensions
                    let stats = {
                        energy: 0, valence: 0, danceability: 0,
                        acousticness: 0, instrumentalness: 0, tempo: 0
                    };
                    let count = 0;

                    features.forEach((f: any) => {
                        if (f) {
                            stats.energy += f.energy;
                            stats.valence += f.valence;
                            stats.danceability += f.danceability;
                            stats.acousticness += f.acousticness;
                            stats.instrumentalness += f.instrumentalness;
                            stats.tempo += f.tempo;
                            count++;
                        }
                    });

                    if (count > 0) {
                        const avg = {
                            energy: stats.energy / count,
                            valence: stats.valence / count,
                            danceability: stats.danceability / count,
                            acousticness: stats.acousticness / count,
                            instrumentalness: stats.instrumentalness / count,
                            tempo: stats.tempo / count
                        };

                        // 4. Call Gemini AI for Narrative Analysis
                        try {
                            const aiRes = await fetch('/api/analyze-mood', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ tracks: tracks.slice(0, 5), stats: avg })
                            });

                            const aiData = await aiRes.json();

                            if (aiData.persona) {
                                setMood({
                                    label: aiData.persona,
                                    color: `from-[${aiData.hexColor}] to-black`,
                                    description: aiData.description
                                });
                            } else {
                                throw new Error("No persona returned");
                            }
                        } catch (aiError) {
                            console.error("AI Analysis failed, falling back to local logic", aiError);

                            // Fallback to local logic if AI fails
                            if (avg.energy > 0.8 && avg.valence > 0.6) {
                                setMood({ label: "Main Character Energy ✨", color: "from-yellow-400 via-orange-500 to-red-500", description: "You are the protagonist of a high-budget summer blockbuster." });
                            } else if (avg.danceability > 0.7 && avg.valence > 0.6) {
                                setMood({ label: "Late Night Discotheque 🪩", color: "from-pink-500 via-purple-500 to-indigo-500", description: "The night is young and so are you." });
                            } else if (avg.acousticness > 0.7 && avg.valence < 0.4) {
                                setMood({ label: "Cottagecore Melancholy 🍄", color: "from-green-700 via-emerald-600 to-teal-700", description: "Rain on a tin roof, old books, and memories." });
                            } else if (avg.energy > 0.7 && avg.valence < 0.3) {
                                setMood({ label: "Villain Arc 🖤", color: "from-red-900 via-gray-900 to-black", description: "Plotting world domination, one track at a time." });
                            } else if (avg.instrumentalness > 0.5) {
                                setMood({ label: "Deep Focus Protocol 🧠", color: "from-blue-600 via-cyan-600 to-sky-700", description: "Locked in. The world fades away." });
                            } else if (avg.valence > 0.7 && avg.energy < 0.5) {
                                setMood({ label: "Golden Hour Glow 🌅", color: "from-orange-400 via-amber-400 to-yellow-300", description: "Everything is going to be alright." });
                            } else if (avg.energy < 0.3 && avg.valence < 0.3) {
                                setMood({ label: "Doomscrolling Dissociation 🌫️", color: "from-gray-600 via-slate-700 to-zinc-800", description: "Staring at the ceiling, feeling the void." });
                            } else {
                                // Fallback to quadrant system if no specific vibe matches
                                if (avg.energy > 0.5 && avg.valence > 0.5) setMood({ label: "Joyful Optimist 🌻", color: "from-yellow-400 to-orange-500", description: "Radiating positivity and good vibes." });
                                else if (avg.energy > 0.5) setMood({ label: "Fueled & Focused 🔥", color: "from-red-500 to-rose-700", description: "Eyes on the prize. Unstoppable." });
                                else if (avg.valence > 0.5) setMood({ label: "Peaceful Drifter 🍃", color: "from-emerald-400 to-teal-500", description: "Floating downstream without a care." });
                                else setMood({ label: "Wistful Dreamer 🌙", color: "from-indigo-500 to-blue-700", description: "Lost in thought, simpler times." });
                            }
                        }
                    } else {
                        // Case: Audio Features API returned empty (rare but possible)
                        setMood({ label: "Mysterious Vibes 🔮", color: "from-purple-600 to-indigo-900", description: "Your musical taste is too elusive for our sensors." });
                    }
                } else {
                    setMood({ label: "Pure Silence 🤫", color: "from-gray-700 to-gray-900", description: "The sound of silence is deafening." });
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
                        <p className="mt-4 text-white/80 max-w-lg text-lg font-medium leading-relaxed italic">
                            "{mood.description}"
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
