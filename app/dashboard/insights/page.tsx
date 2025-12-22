'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Info, ArrowLeft, Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { InsightCard } from '@/components/InsightCard';
import { Button } from '@/components/ui/button';
import { fetchRecentlyPlayed, fetchAudioFeatures } from '@/lib/spotify';
import { processListeningHistory, calculateDailyMetrics, detectPatterns, calculatePersonalBaseline, Insight } from '@/lib/analytics';

export default function InsightsPage() {
    const router = useRouter();
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInsights = async () => {
            const token = localStorage.getItem('spotify_token');
            if (!token) return;

            try {
                const tracks = await fetchRecentlyPlayed(token);
                const enriched = await fetchAudioFeatures(token, tracks);
                const metrics = calculateDailyMetrics(enriched);
                const baseline = calculatePersonalBaseline(metrics);
                const detected = detectPatterns(metrics, enriched, baseline);
                setInsights(detected);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        loadInsights();
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <header className="flex items-center gap-4 mb-12">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-2xl hover:bg-white/5">
                    <ArrowLeft size={24} />
                </Button>
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">Emotional Insights</h1>
                    <p className="text-gray-400">Understanding the "why" behind your listening habits.</p>
                </div>
            </header>

            <div className="grid gap-6">
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-spotify-green border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : insights.length > 0 ? (
                    insights.map((insight, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-spotify-green/20 flex items-center justify-center text-spotify-green">
                                            <Lightbulb size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white">{insight.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${insight.severity === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-spotify-green/20 text-spotify-green'
                                                    }`}>
                                                    Confidence: 85%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                    {insight.description}
                                </p>

                                <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl mb-8">
                                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                                        <Info size={16} className="text-spotify-green" />
                                        Why am I seeing this?
                                    </h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        MoodTrack identifies this pattern when your sonic metrics (valence and energy) deviate from your established personal baseline. In this case, we noticed a consistent trend over the last 48 hours that matches recognized emotional signatures.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    {insight.actionLabel && (
                                        <Button className="bg-spotify-green text-black font-black px-8 h-12 rounded-2xl">
                                            {insight.actionLabel}
                                        </Button>
                                    )}
                                    <Button variant="ghost" className="text-gray-400 hover:text-white rounded-2xl h-12 px-6">
                                        Dismiss
                                    </Button>
                                    <Button variant="ghost" className="text-gray-400 hover:text-white rounded-2xl h-12 px-6">
                                        Keep Pinned
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="p-12 text-center rounded-[32px] bg-white/5 border border-white/10 border-dashed">
                        <Sparkles className="mx-auto text-gray-600 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-white">No active patterns</h3>
                        <p className="text-gray-400 max-w-sm mx-auto mt-2">
                            Keep listening to Spotify! As your history grows, MoodTrack will begin to uncover deeper emotional insights.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
