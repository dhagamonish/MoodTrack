'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Tag, Send, X, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MindfulReflection() {
    const [tags, setTags] = useState<string[]>(['Work Stress', 'Productive Day', 'Good Sleep']);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
        { role: 'ai', text: "I've noticed your tracks are quite energetic today. How are you feeling in this moment?" }
    ]);
    const [isTagging, setIsTagging] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', text: input }]);
        setInput('');

        // Mock AI Response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: "Thank you for sharing. Reflecting on your state helps calibrate MoodTrack to your unique personal baseline."
            }]);
        }, 1000);
    };

    const addTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
        }
        setIsTagging(false);
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden flex flex-col h-[500px]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare size={20} className="text-spotify-green" />
                    Mindful Reflection
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setIsTagging(true)} className="text-spotify-green hover:bg-spotify-green/10 rounded-full h-8 px-3">
                    <Tag size={14} className="mr-2" />
                    Tag Event
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-spotify-green text-black font-medium'
                                    : 'bg-white/10 text-gray-200'
                                }`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="p-4 bg-black/20">
                <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide px-2">
                    {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 whitespace-nowrap">
                            #{tag.replace(/\s+/g, '')}
                        </span>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your state of mind..."
                        className="w-full bg-white/5 border border-white/20 rounded-2xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-spotify-green/50 transition-colors"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-2 p-1.5 bg-spotify-green rounded-xl text-black hover:scale-105 transition-transform"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>

            {/* Tag Modal (Mobile/Simple) */}
            <AnimatePresence>
                {isTagging && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-neutral-900 border border-white/10 p-6 rounded-3xl w-full max-w-sm"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-bold flex items-center gap-2">
                                    <Sparkles className="text-spotify-green" size={20} />
                                    Life Events
                                </h4>
                                <Button variant="ghost" size="icon" onClick={() => setIsTagging(false)}>
                                    <X size={20} />
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {['Burnt out', 'Travel', 'Party', 'Heartbreak', 'Workout', 'Yoga', 'Bad Mood', 'Night Shift'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => addTag(t)}
                                        className="text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-spotify-green/50 hover:bg-spotify-green/5 transition-all text-sm"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <Button className="w-full bg-white text-black font-bold h-12 rounded-2xl" onClick={() => setIsTagging(false)}>
                                Done
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
