'use client';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { motion } from 'framer-motion';

interface WeeklyMoodChartProps {
    data: {
        date: string;
        valence: number;
        energy: number;
    }[];
}

export function WeeklyMoodChart({ data }: WeeklyMoodChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500 bg-white/5 rounded-3xl border border-white/10">
                Not enough data yet. Keep listening!
            </div>
        );
    }

    const formattedData = data.map(d => ({
        ...d,
        day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
        valencePercent: Math.round(d.valence * 100),
        energyPercent: Math.round(d.energy * 100)
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-80 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 relative overflow-hidden shadow-tactile"
        >
            <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-spotify-green" />
                Emotional Timeline
            </h3>

            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorValence" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#1DB954" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59B23" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F59B23" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                    <XAxis
                        dataKey="day"
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 100]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(10px)'
                        }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="valencePercent"
                        name="Happiness"
                        stroke="#1DB954"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValence)"
                    />
                    <Area
                        type="monotone"
                        dataKey="energyPercent"
                        name="Energy"
                        stroke="#F59B23"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorEnergy)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
