'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventTagModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTag: (event: string) => void;
}

const eventTypes = [
    { label: 'Exam week', color: 'bg-red-500' },
    { label: 'Breakup', color: 'bg-purple-500' },
    { label: 'Travel', color: 'bg-blue-500' },
    { label: 'New job', color: 'bg-green-500' },
    { label: 'Workout', color: 'bg-orange-500' },
    { label: 'Yoga', color: 'bg-emerald-500' },
    { label: 'Night shift', color: 'bg-neutral-500' },
    { label: 'Sick', color: 'bg-yellow-500' }
];

export function EventTagModal({ isOpen, onClose, onTag }: EventTagModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-neutral-900 border border-white/10 p-8 rounded-[40px] max-w-md w-full shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6">
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X size={24} />
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-spotify-green/20 flex items-center justify-center text-spotify-green">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tighter">Tag Life Event</h2>
                                <p className="text-gray-500 text-xs">Explain the context of your data</p>
                            </div>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block">Quick Select</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {eventTypes.map(event => (
                                        <button
                                            key={event.label}
                                            className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-spotify-green/30 text-sm font-bold transition-all text-left flex items-center gap-3"
                                            onClick={() => onTag(event.label)}
                                        >
                                            <div className={`w-2 h-2 rounded-full ${event.color} group-hover:scale-150 transition-transform`} />
                                            {event.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block">Details (Optional)</label>
                                <textarea
                                    placeholder="Any specific notes for this period?"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-spotify-green/50 min-h-[100px] resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Calendar size={18} />
                                    <span className="text-xs font-bold">Effective Date</span>
                                </div>
                                <span className="text-xs font-black text-white">Today, Dec 22</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="ghost" className="h-12 rounded-2xl font-bold bg-white/5" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button className="h-12 rounded-2xl font-black bg-white text-black hover:scale-[1.02] transition-transform" onClick={onClose}>
                                Save Event
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
