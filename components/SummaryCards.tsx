'use client';

import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertCircle, Heart } from 'lucide-react';
import { PersonalBaseline } from '@/lib/analytics';

interface SummaryCardsProps {
    baseline: PersonalBaseline;
    trend: string;
    alert?: string;
    avgDiversity: number;
    totalListeningTime: number;
}

export function SummaryCards({ baseline, trend, alert, avgDiversity, totalListeningTime }: SummaryCardsProps) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex flex-col justify-between"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-spotify-green/20 flex items-center justify-center text-spotify-green">
                        <Heart size={20} />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Baseline</span>
                </div>
                <div>
                    <h4 className="text-2xl font-black text-white">{Math.round(baseline.avgValence * 100)}%</h4>
                    <p className="text-xs text-gray-400">Average Happiness</p>
                </div>
            </motion.div>

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex flex-col justify-between"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-sunset-violet/20 flex items-center justify-center text-sunset-violet">
                        <Activity size={20} />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Efficiency</span>
                </div>
                <div>
                    <h4 className="text-2xl font-black text-white">{Math.round(totalListeningTime)}m</h4>
                    <p className="text-xs text-gray-400">Total Listening Time</p>
                </div>
            </motion.div>

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex flex-col justify-between"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-spotify-lime/20 flex items-center justify-center text-spotify-lime">
                        <TrendingUp size={20} />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Discovery</span>
                </div>
                <div>
                    <h4 className="text-2xl font-black text-white">{Math.round(avgDiversity * 100)}%</h4>
                    <p className="text-xs text-gray-400">Sonic Diversity</p>
                </div>
            </motion.div>

            <motion.div
                whileHover={{ y: -5 }}
                className={`p-6 rounded-[32px] border flex flex-col justify-between ${alert
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${alert ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-gray-400'
                        }`}>
                        <AlertCircle size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</span>
                </div>
                <div>
                    <h4 className={`text-sm font-bold leading-tight ${alert ? 'text-white' : ''}`}>
                        {alert || "All systems nominal"}
                    </h4>
                    <p className="text-[10px] opacity-60 mt-1 uppercase tracking-tighter">Current Sentiment</p>
                </div>
            </motion.div>
        </div>
    );
}
