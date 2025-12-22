'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Activity, Plus, ArrowRight, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculatePersonalBaseline, detectPatterns, DailyMetric, Insight, PersonalBaseline } from '@/lib/analytics';
import { fetchRecentlyPlayed, fetchAudioFeatures } from '@/lib/spotify';

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [summary, setSummary] = useState<{
        baseline: string,
        pattern: Insight | null,
        action: string
    }>({
        baseline: "Analyzing your sonic fingerprint...",
        pattern: null,
        action: "Calibrating recovery tools..."
    });

    useEffect(() => {
        const loadOnboardingData = async () => {
            const token = localStorage.getItem('spotify_token');
            if (!token) {
                router.push('/');
                return;
            }

            try {
                // Fetch profile
                const profileRes = await fetch('https://api.spotify.com/v1/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const profile = await profileRes.json();
                setUser(profile);

                // Quick Analytics
                const tracks = await fetchRecentlyPlayed(token);
                const enriched = await fetchAudioFeatures(token, tracks);
                const metrics = calculateDailyMetrics(enriched);
                const baseline = calculatePersonalBaseline(metrics);
                const patterns = detectPatterns(metrics, enriched, baseline);

                setSummary({
                    baseline: `Your music tends to be ${baseline.avgEnergy > 0.6 ? 'High Energy' : 'Calm'} and ${baseline.avgValence > 0.5 ? 'Positive' : 'Introspective'}.`,
                    pattern: patterns[0] || null,
                    action: patterns[0]?.actionLabel || "Generate Recovery Mix"
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                router.push('/dashboard');
            }
        };

        loadOnboardingData();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-8"
                >
                    <Activity className="text-spotify-green" size={48} />
                </motion.div>
                <h1 className="text-3xl font-bold mb-4">Crafting your emotional map...</h1>
                <p className="text-gray-400">We're indexing your recent listening behavior.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-spotify-green/10 via-transparent to-transparent">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-spotify-green/10 border border-spotify-green/20 text-spotify-green text-sm font-bold mb-6">
                        <Sparkles size={16} />
                        ONBOARDING COMPLETE
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4">
                        Welcome back, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-spotify-green to-spotify-lime">
                            {user?.display_name || 'Listener'}
                        </span>
                    </h1>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/[0.07] transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-spotify-green/20 flex items-center justify-center text-spotify-green mb-6">
                            <Activity size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Your Baseline</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{summary.baseline}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/[0.07] transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-sunset-violet/20 flex items-center justify-center text-sunset-violet mb-6">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Primary Pattern</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {summary.pattern ? summary.pattern.description : "Your listening is currently balanced and stable."}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/[0.07] transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-spotify-lime/20 flex items-center justify-center text-spotify-lime mb-6">
                            <Plus size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Suggested Action</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {summary.pattern?.actionLabel || "Continue listening to build deeper emotional insights."}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        onClick={() => router.push('/dashboard')}
                        className="h-14 px-12 bg-white text-black font-black rounded-full hover:scale-105 transition-all text-lg"
                    >
                        View Dashboard
                        <ArrowRight size={20} className="ml-2" />
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => router.push('/dashboard/playlists')}
                        className="h-14 px-8 text-white font-bold opacity-60 hover:opacity-100 flex items-center gap-2"
                    >
                        <Music2 size={20} />
                        Generate Recovery Mix
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

// Minimal helpers needed for onboarding summary
function calculateDailyMetrics(enrichedTracks: any[]): DailyMetric[] {
    const daily: Record<string, DailyMetric> = {};
    enrichedTracks.forEach(item => {
        const date = new Date(item.played_at).toISOString().split('T')[0];
        if (!daily[date]) {
            daily[date] = { date, valence: 0, energy: 0, count: 0 };
        }
        daily[date].valence += item.features.valence;
        daily[date].energy += item.features.energy;
        daily[date].count++;
    });

    return Object.values(daily).map(d => ({
        ...d,
        valence: d.valence / d.count,
        energy: d.energy / d.count
    }));
}
