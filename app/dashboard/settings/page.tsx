'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Shield, Database, LogOut, ChevronRight, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter text-white">Settings</h1>
                <p className="text-gray-400">Control your data, privacy, and account connectivity.</p>
            </header>

            <div className="space-y-12">
                {/* Account Section */}
                <section>
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <User size={16} />
                        Account & Spotify
                    </h3>
                    <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
                        <div className="p-6 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-spotify-green/20 flex items-center justify-center text-spotify-green">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Spotify Connection</h4>
                                    <p className="text-sm text-gray-400">Connected as MD</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    localStorage.removeItem('spotify_token');
                                    window.location.href = '/';
                                }}
                                className="text-red-400 hover:bg-red-500/10 rounded-2xl font-bold"
                            >
                                Disconnect
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Data Section */}
                <section>
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Database size={16} />
                        Data & Analytics
                    </h3>
                    <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden divide-y divide-white/5">
                        <button className="w-full h-20 px-8 flex items-center justify-between hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <Download size={20} />
                                </div>
                                <span className="font-bold text-white">Export Emotional History</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                        </button>
                        <button
                            onClick={() => {
                                if (confirm("Are you sure? This will delete all your local insights and history. This action cannot be undone.")) {
                                    localStorage.clear();
                                    alert("All local data has been cleared.");
                                    window.location.href = '/';
                                }
                            }}
                            className="w-full h-20 px-8 flex items-center justify-between hover:bg-white/5 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                                    <Trash2 size={20} />
                                </div>
                                <span className="font-bold text-white">Clear All Local Data</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </section>

                {/* Privacy Section */}
                <section>
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Shield size={16} />
                        Privacy & Security
                    </h3>
                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-spotify-green/20 flex items-center justify-center text-spotify-green shrink-0">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-white mb-2">Zero-Data Architecture</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    MoodTrack performs all analytics on your device. We do not store your Spotify passwords, nor do we sell your listening history to third parties. Your data is your property.
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => window.open('https://www.spotify.com/privacy', '_blank')}
                            className="w-full bg-white/5 text-white font-bold h-12 rounded-2xl border border-white/5"
                        >
                            Read Full Privacy Policy
                        </Button>
                    </div>
                </section>

                <div className="flex justify-center pt-8">
                    <Button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/';
                        }}
                        className="bg-red-500 text-white font-black px-12 h-14 rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        <LogOut size={24} />
                        End Session & Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
