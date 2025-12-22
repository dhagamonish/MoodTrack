'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Music2, User, LogOut, Activity, RefreshCw, Sparkles } from 'lucide-react';
import { WeeklyMoodChart } from '@/components/WeeklyMoodChart';
import { InsightCard } from '@/components/InsightCard';
import { MindfulReflection } from '@/components/MindfulReflection';
import { SummaryCards } from '@/components/SummaryCards';
import { ActionCards } from '@/components/ActionCards';
import { EventTagModal } from '@/components/EventTagModal';
import { fetchRecentlyPlayed, fetchAudioFeatures, createPlaylist, fetchRecommendations } from '@/lib/spotify';
import { processListeningHistory, calculateDailyMetrics, detectPatterns, DailyMetric, Insight, calculatePersonalBaseline, PersonalBaseline } from '@/lib/analytics';

interface SpotifyProfile {
    display_name: string;
    id: string;
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
    const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[]>([]);
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTagging, setIsTagging] = useState(false);
    const [mood, setMood] = useState({ label: "Analyzing...", color: "from-gray-500 to-gray-700", description: "Connecting to your sonic consciousness..." });

    useEffect(() => {
        const token = localStorage.getItem('spotify_token');
        if (!token) {
            router.push('/');
            return;
        }

        async function fetchData() {
            try {
                // 1. Fetch Profile
                const profileRes = await fetch('https://api.spotify.com/v1/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const profileData = await profileRes.json();
                setProfile(profileData);

                // 2. Fetch Recently Played (History)
                const recentData = await fetchRecentlyPlayed(token!, 50);
                const recentItems = recentData.items || [];

                // Get IDs for Audio Features
                const recentIds = Array.from(new Set(recentItems.map((item: any) => item.track.id))) as string[];

                // 3. Fetch Top Tracks (Baseline Taste)
                const tracksRes = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=medium_term', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const tracksData = await tracksRes.json();
                const tracks = tracksData.items || [];
                setTopTracks(tracks.slice(0, 5));
                const topIds = tracks.map((t: any) => t.id);

                // 4. Fetch Audio Features (Batch)
                const allIds = Array.from(new Set([...recentIds, ...topIds])) as string[];
                const audioFeatures = await fetchAudioFeatures(token!, allIds);

                // 5. Analytics Pipeline
                const richHistory = processListeningHistory(recentItems, audioFeatures);
                const metrics = calculateDailyMetrics(richHistory);
                setDailyMetrics(metrics);

                const baseline = calculatePersonalBaseline(metrics);
                const detectedInsights = detectPatterns(metrics, richHistory, baseline);
                setInsights(detectedInsights);

                // 6. Calculate Average Mood (Current Vibe)
                // Use the most recent day's metrics if available, otherwise average of all history
                let currentValence = 0.5;
                let currentEnergy = 0.5;

                if (metrics.length > 0) {
                    const lastDay = metrics[metrics.length - 1];
                    currentValence = lastDay.valence;
                    currentEnergy = lastDay.energy;
                }

                // Determine Persona/Vibe
                const valenceThreshold = baseline.avgValence - baseline.stdValence;
                const energyThreshold = baseline.avgEnergy + baseline.stdEnergy;

                if (currentEnergy > 0.8 && currentValence > 0.6) {
                    setMood({ label: "Main Character Energy ✨", color: "from-yellow-400 via-orange-500 to-red-500", description: "You are the protagonist of a high-budget summer blockbuster." });
                } else if (currentEnergy > energyThreshold && currentValence < valenceThreshold) {
                    setMood({ label: "Emotional Fatigue 🕯️", color: "from-blue-900 via-slate-800 to-gray-900", description: "You've been pushing hard, but your heart is heavy. This often happens during burnout." });
                } else if (currentEnergy > 0.7 && currentValence < 0.3) {
                    setMood({ label: "Villain Arc 🖤", color: "from-red-900 via-gray-900 to-black", description: "Plotting world domination, one track at a time." });
                } else if (currentValence > 0.7 && currentEnergy < 0.5) {
                    setMood({ label: "Golden Hour Glow 🌅", color: "from-orange-400 via-amber-400 to-yellow-300", description: "Everything is going to be alright." });
                } else if (currentEnergy < 0.4 && currentValence < 0.4) {
                    setMood({ label: "Quiet Introspection 🌧️", color: "from-blue-900 via-slate-800 to-gray-900", description: "A moment of reflection in the silence." });
                } else {
                    setMood({ label: "Balanced Flow 🌊", color: "from-emerald-500 to-teal-700", description: "Riding the waves of rhythm with perfect poise." });
                }

                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch spotify data", err);
                // Don't auto-logout on every error, might be just one failed call
                // localStorage.removeItem('spotify_token'); 
                // router.push('/');
                setLoading(false);
            }
        }

        fetchData();
    }, [router]);

    const handleAction = async (insight: Insight) => {
        if (!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID) return;
        const token = localStorage.getItem('spotify_token');
        if (!token || !profile) return;

        if (insight.actionLabel) {
            try {
                // 1. Get Recommendations
                const seedTracks = topTracks.slice(0, 3).map(t => t.id);
                const recs = await fetchRecommendations(
                    token,
                    seedTracks,
                    insight.actionParams.targetValence,
                    insight.actionParams.targetEnergy
                );

                if (recs && recs.tracks) {
                    const uris = recs.tracks.map((t: any) => t.uri);
                    // 2. Create Playlist
                    const playlist = await createPlaylist(token, profile.id, `MoodTrack: ${insight.title}`, uris);
                    alert(`Created playlist "${playlist.name}" in your library!`);
                    window.open(playlist.external_urls.spotify, '_blank');
                }
            } catch (e) {
                console.error(e);
                alert("Failed to create playlist. Make sure you approved the new permissions (Disconnect & Reconnect).");
            }
        }
    };

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
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.2
                    }
                }
            }}
            className="relative"
        >
            {/* Header / Vibe Block */}
            <motion.header
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
            >
                <div className="flex items-center gap-4">
                    {profile?.images?.[0]?.url ? (
                        <img src={profile.images[0].url} alt="Profile" className="w-16 h-16 rounded-3xl border-2 border-spotify-green shadow-glow" />
                    ) : (
                        <div className="w-16 h-16 rounded-3xl bg-gray-800 flex items-center justify-center border-2 border-white/10">
                            <User size={24} />
                        </div>
                    )}
                    <div>
                        <h2 className="text-xs text-gray-500 uppercase tracking-widest font-black">Logged in as</h2>
                        <h1 className="text-3xl font-black text-white tracking-tighter">{profile?.display_name}</h1>
                    </div>
                </div>
            </motion.header>

            {/* Tier 1: Summary Cards */}
            <motion.section
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="mb-12"
            >
                <SummaryCards
                    baseline={calculatePersonalBaseline(dailyMetrics)}
                    trend={dailyMetrics.length > 1 ? (dailyMetrics[dailyMetrics.length - 1].valence > dailyMetrics[dailyMetrics.length - 2].valence ? 'Improving' : 'Slightly Lower') : 'Stable'}
                    alert={insights.find(i => i.severity === 'high')?.title}
                />
            </motion.section>

            {/* Tier 2: Weekly Mood Chart + Mindful Reflection */}
            <motion.section
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="grid lg:grid-cols-3 gap-8 mb-12"
            >
                <div className="lg:col-span-2 space-y-8">
                    <WeeklyMoodChart data={dailyMetrics} />
                    <MindfulReflection />
                </div>
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-200 flex items-center gap-2">
                        <RefreshCw size={20} className="text-spotify-green" />
                        Key Insights
                    </h3>
                    <div className="space-y-4">
                        {insights.length > 0 ? (
                            insights.map((insight, i) => (
                                <InsightCard
                                    key={i}
                                    {...insight}
                                    onAction={() => handleAction(insight)}
                                />
                            ))
                        ) : (
                            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 text-gray-400 text-center italic">
                                Exploring your sonic patterns...
                            </div>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* Action Cards */}
            <motion.section
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="mb-12"
            >
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                    <Sparkles className="text-spotify-green" size={20} />
                    Quick Actions
                </h3>
                <ActionCards
                    onGenerate={() => insights[0] && handleAction(insights[0])}
                    onViewInsights={() => router.push('/dashboard/insights')}
                    onTagEvent={() => setIsTagging(true)}
                    onRefresh={() => window.location.reload()}
                />
            </motion.section>

            {/* Top Tracks / Sonic Signature */}
            <motion.section
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="mb-12"
            >
                <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2">
                    <Music2 size={24} className="text-spotify-green" />
                    Your Sonic Signature
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topTracks.map((track, i) => (
                        <motion.div
                            key={track.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2 + (i * 0.1) }}
                            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default hover:border-spotify-green/30 hover:shadow-[0_0_20px_rgba(29,185,84,0.1)]"
                        >
                            <span className="text-2xl font-black text-white/20 w-8 text-center">{i + 1}</span>
                            <img src={track.album.images[0]?.url} alt={track.name} className="w-16 h-16 rounded-xl shadow-lg group-hover:scale-105 transition-transform" />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-bold text-white truncate">{track.name}</h4>
                                <p className="text-sm text-gray-400 truncate">{track.artists.map(a => a.name).join(', ')}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <EventTagModal
                isOpen={isTagging}
                onClose={() => setIsTagging(false)}
                onTag={(tag: string) => {
                    console.log('Tagged:', tag);
                    setIsTagging(false);
                }}
            />
        </motion.div>
    );
}

function SparklesWrapper() {
    return <Sparkles className="text-spotify-green" size={20} />;
}
