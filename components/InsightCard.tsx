'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Play } from 'lucide-react';

interface InsightCardProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    type?: 'streak' | 'stress' | 'burnout' | 'recovery' | 'chill' | 'none';
    severity?: 'low' | 'medium' | 'high';
}

export function InsightCard({ title, description, actionLabel, onAction, type = 'none', severity }: InsightCardProps) {
    const getColors = () => {
        switch (type) {
            case 'streak': return "from-blue-900/40 to-blue-600/10 border-blue-500/30";
            case 'stress': return "from-orange-900/40 to-red-600/10 border-orange-500/30";
            case 'burnout': return "from-red-900/40 to-gray-600/10 border-red-500/30";
            case 'recovery': return "from-emerald-900/40 to-teal-600/10 border-emerald-500/30";
            case 'chill': return "from-purple-900/40 to-pink-600/10 border-purple-500/30";
            default: return "from-gray-800/40 to-gray-600/10 border-gray-500/30";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative p-6 rounded-3xl bg-gradient-to-br ${getColors()} border backdrop-blur-sm overflow-hidden group`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-50">
                <Sparkles className="w-12 h-12 text-white/10" />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-white/50">Insight Detected</div>
                    {severity && (
                        <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${severity === 'high' ? 'bg-red-500 text-white' :
                                severity === 'medium' ? 'bg-orange-500 text-white' :
                                    'bg-blue-500 text-white'
                            }`}>
                            {severity} Priority
                        </div>
                    )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

                {actionLabel && (
                    <Button
                        onClick={onAction}
                        className="bg-white text-black hover:bg-gray-200 rounded-full font-bold shadow-lg group-hover:shadow-white/20 transition-all"
                    >
                        {actionLabel}
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </div>
        </motion.div>
    );
}
