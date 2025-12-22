'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, ExternalLink, RefreshCw, Trash2, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PlaylistsPage() {
    const [playlists, setPlaylists] = useState([
        { id: 1, name: "Mood Recovery Mix", mood: "Uplifting", created: "2h ago", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop" },
        { id: 2, name: "Calm Evenings", mood: "Relaxing", created: "Yesterday", image: "https://images.unsplash.com/photo-1544690356-91223e74be8d?w=400&h=400&fit=crop" },
        { id: 3, name: "Energy Reset", mood: "High Energy", created: "3 days ago", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop" },
    ]);

    return (
        <div className="max-w-5xl mx-auto py-8">
            <header className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">Your Playlists</h1>
                    <p className="text-gray-400">Therapeutic sonic outputs tailored to your state.</p>
                </div>
                <Button className="bg-spotify-green text-black font-black px-6 h-12 rounded-2xl hover:scale-105 transition-transform">
                    <Plus size={20} className="mr-2" />
                    New Recovery Mix
                </Button>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists.map((playlist, i) => (
                    <motion.div
                        key={playlist.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-white/5 border border-white/10 p-6 rounded-[40px] hover:bg-white/10 transition-all overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart size={20} className="text-white/60 hover:text-red-500 cursor-pointer" />
                        </div>

                        <img
                            src={playlist.image}
                            alt={playlist.name}
                            className="w-full aspect-square rounded-[32px] mb-6 object-cover shadow-2xl group-hover:scale-[1.02] transition-transform"
                        />

                        <div className="mb-6">
                            <h3 className="text-xl font-black text-white mb-1">{playlist.name}</h3>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full bg-spotify-green/10 text-spotify-green text-[10px] font-black uppercase">
                                    {playlist.mood}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">{playlist.created}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="ghost" className="bg-white/5 rounded-2xl text-xs font-bold h-11 border border-white/5 hover:border-white/10">
                                <RefreshCw size={14} className="mr-2" />
                                Regenerate
                            </Button>
                            <Button variant="ghost" className="bg-white/5 rounded-2xl text-xs font-bold h-11 border border-white/5 hover:border-white/10">
                                <Trash2 size={14} className="mr-2 text-red-400" />
                                Delete
                            </Button>
                        </div>

                        <Button className="w-full mt-3 bg-white text-black font-black h-12 rounded-2xl flex items-center justify-center gap-2">
                            <ExternalLink size={20} />
                            Open in Spotify
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
