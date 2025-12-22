'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { History, Calendar, Filter, ArrowLeft, Tag as TagIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { WeeklyMoodChart } from '@/components/WeeklyMoodChart';
import { Button } from '@/components/ui/button';
import { fetchRecentlyPlayed, fetchAudioFeatures } from '@/lib/spotify';
import { calculateDailyMetrics, DailyMetric } from '@/lib/analytics';

export default function TimelinePage() {
    const router = useRouter();
    const [metrics, setMetrics] = useState<DailyMetric[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('spotify_token');
            if (!token) return;
            try {
                const tracks = await fetchRecentlyPlayed(token);
                const enriched = await fetchAudioFeatures(token, tracks);
                const m = calculateDailyMetrics(enriched);
                setMetrics(m);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="max-w-5xl mx-auto py-8">
            <header className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-2xl hover:bg-white/5">
                        <ArrowLeft size={24} />
                    </Button>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-white">Your Timeline</h1>
                        <p className="text-gray-400">A historical map of your emotional resonance.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" className="rounded-full bg-white/5 text-xs font-bold px-4">
                        <Calendar size={14} className="mr-2" />
                        Last 30 Days
                    </Button>
                    <Button variant="ghost" className="rounded-full bg-white/5 text-xs font-bold px-4">
                        <Filter size={14} className="mr-2" />
                        Filter
                    </Button>
                </div>
            </header>

            <div className="space-y-12">
                <section>
                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 mb-8">
                        <WeeklyMoodChart data={metrics} />
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <TagIcon className="text-spotify-green" size={20} />
                        Historical Markers
                    </h3>
                    <div className="space-y-4">
                        {metrics.map((day, i) => (
                            <motion.div
                                key={day.date}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex items-center gap-6 p-6 rounded-[32px] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                            >
                                <div className="text-left min-w-[100px]">
                                    <div className="text-sm font-black text-white">
                                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                                    </div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-spotify-green transition-all"
                                                style={{ width: `${day.valence * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">Valence</span>
                                        <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-sunset-violet transition-all"
                                                style={{ width: `${day.energy * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">Energy</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-white">{day.count} tracks</div>
                                    <div className="text-[10px] text-gray-500">2.4h listened</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
