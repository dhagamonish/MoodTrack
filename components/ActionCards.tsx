'use client';

import { motion } from 'framer-motion';
import { Music2, Sparkles, Tag, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionCardsProps {
    onGenerate: () => void;
    onViewInsights: () => void;
    onTagEvent: () => void;
    onRefresh: () => void;
}

export function ActionCards({ onGenerate, onViewInsights, onTagEvent, onRefresh }: ActionCardsProps) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
                onClick={onGenerate}
                className="group p-6 rounded-[32px] bg-spotify-green text-black flex flex-col items-start text-left hover:scale-[1.02] transition-all shadow-xl"
            >
                <Music2 size={24} className="mb-4" />
                <h4 className="text-lg font-black leading-tight mb-1">Generate <br />Recovery Mix</h4>
                <p className="text-xs font-medium opacity-70">Personalized mood reset</p>
            </button>

            <button
                onClick={onViewInsights}
                className="group p-6 rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-start text-left hover:bg-white/[0.08] transition-all"
            >
                <Sparkles size={24} className="mb-4 text-sunset-violet" />
                <h4 className="text-lg font-black leading-tight mb-1 text-white">View <br />Insights</h4>
                <p className="text-xs text-gray-400">Deep dive into patterns</p>
            </button>

            <button
                onClick={onTagEvent}
                className="group p-6 rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-start text-left hover:bg-white/[0.08] transition-all"
            >
                <Tag size={24} className="mb-4 text-spotify-lime" />
                <h4 className="text-lg font-black leading-tight mb-1 text-white">Tag a <br />Life Event</h4>
                <p className="text-xs text-gray-400">Contextualize your data</p>
            </button>

            <button
                onClick={onRefresh}
                className="group p-6 rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-start text-left hover:bg-white/[0.08] transition-all"
            >
                <RefreshCw size={24} className="mb-4 text-gray-400 group-hover:rotate-180 transition-transform duration-500" />
                <h4 className="text-lg font-black leading-tight mb-1 text-white">Refresh <br />Data</h4>
                <p className="text-xs text-gray-400">Sync with Spotify library</p>
            </button>
        </div>
    );
}
