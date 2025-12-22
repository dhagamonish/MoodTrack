
interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    played_at: string;
    duration_ms: number;
}

interface AudioFeatures {
    id: string;
    valence: number;
    energy: number;
    danceability: number;
}

export interface DailyMetric {
    date: string;
    valence: number;
    energy: number;
    count: number;
}

export interface Insight {
    type: 'streak' | 'stress' | 'burnout' | 'recovery' | 'chill' | 'none';
    title: string;
    description: string;
    actionLabel?: string;
    actionParams?: any;
    severity?: 'low' | 'medium' | 'high';
}

export interface PersonalBaseline {
    avgValence: number;
    avgEnergy: number;
    stdValence: number;
    stdEnergy: number;
}

export function calculatePersonalBaseline(metrics: DailyMetric[]): PersonalBaseline {
    if (metrics.length === 0) return { avgValence: 0.5, avgEnergy: 0.5, stdValence: 0.1, stdEnergy: 0.1 };

    const avgValence = metrics.reduce((acc, m) => acc + m.valence, 0) / metrics.length;
    const avgEnergy = metrics.reduce((acc, m) => acc + m.energy, 0) / metrics.length;

    const stdValence = Math.sqrt(metrics.reduce((acc, m) => acc + Math.pow(m.valence - avgValence, 2), 0) / metrics.length);
    const stdEnergy = Math.sqrt(metrics.reduce((acc, m) => acc + Math.pow(m.energy - avgEnergy, 2), 0) / metrics.length);

    return { avgValence, avgEnergy, stdValence, stdEnergy };
}

export function processListeningHistory(recentlyPlayedItems: any[], audioFeatures: any[]) {
    // Map features by ID for O(1) lookup
    const featuresMap = new Map();
    audioFeatures.forEach(f => {
        if (f) featuresMap.set(f.id, f);
    });

    const richHistory = recentlyPlayedItems.map(item => {
        const feature = featuresMap.get(item.track.id);
        return {
            ...item,
            features: feature
        };
    }).filter(item => item.features); // Filter out tracks with no features

    return richHistory;
}

export function calculateDailyMetrics(richHistory: any[]): DailyMetric[] {
    const dailyMap = new Map<string, { valence: number, energy: number, count: number }>();

    richHistory.forEach(item => {
        // Parse date (YYYY-MM-DD)
        const date = new Date(item.played_at).toISOString().split('T')[0];

        const current = dailyMap.get(date) || { valence: 0, energy: 0, count: 0 };

        dailyMap.set(date, {
            valence: current.valence + item.features.valence,
            energy: current.energy + item.features.energy,
            count: current.count + 1
        });
    });

    const metrics: DailyMetric[] = Array.from(dailyMap.entries()).map(([date, data]) => ({
        date,
        valence: data.valence / data.count,
        energy: data.energy / data.count,
        count: data.count
    }));

    // Sort by date ascending
    return metrics.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function detectPatterns(metrics: DailyMetric[], richHistory: any[], baseline: PersonalBaseline): Insight[] {
    const insights: Insight[] = [];
    if (metrics.length === 0) return insights;

    const recent = metrics[metrics.length - 1];
    const prev = metrics.length > 1 ? metrics[metrics.length - 2] : null;

    const effectiveStdValence = baseline.stdValence || 0.15;
    const effectiveStdEnergy = baseline.stdEnergy || 0.15;
    const valenceThreshold = baseline.avgValence - effectiveStdValence;
    const energyThreshold = baseline.avgEnergy + effectiveStdEnergy;

    // 1. Low Valence Streak (Sadness)
    if (prev && recent.valence < valenceThreshold && prev.valence < valenceThreshold) {
        insights.push({
            type: 'streak',
            title: "Low Mood Streak",
            description: "You've been listening to music with lower emotional valence than your usual baseline for 2 days. This often happens during emotional fatigue.",
            actionLabel: "Mood Recovery Mix",
            actionParams: { targetValence: Math.min(0.8, baseline.avgValence + 0.2), targetEnergy: 0.5 }
        });
    }

    // 2. Stress Signature (High Energy + Low Valence + Repetition)
    const isHighEnergy = recent.energy > energyThreshold;
    const isLowValence = recent.valence < valenceThreshold;

    // Check for repetition in recent history (last 10 tracks)
    const last10 = richHistory.slice(0, 10);
    const uniqueTracks = new Set(last10.map(item => item.track.id)).size;
    const isRepetitive = uniqueTracks < 7; // Arbitrary: 30% repetition

    if (isHighEnergy && isLowValence && isRepetitive) {
        insights.push({
            type: 'stress',
            title: "Stress Signature Detected",
            description: "High energy, low valence music with high repetition counts. This pattern is often seen during periods of high stress or intense focus.",
            actionLabel: "Calming Routine",
            actionParams: { targetValence: 0.6, targetEnergy: 0.2 },
            severity: 'medium'
        });
    }

    // 3. Burnout Signals (Late Nights + Low Diversity + Long Hours)
    // Late night check: tracks played between 11 PM and 4 AM
    const lateNightTracks = richHistory.filter(item => {
        const hour = new Date(item.played_at).getHours();
        return hour >= 23 || hour <= 4;
    });
    const isLateNightListener = lateNightTracks.length > 5;

    // Diversity check: unique artists in last 20 tracks
    const last20 = richHistory.slice(0, 20);
    const uniqueArtists = new Set(last20.map(item => item.track.artists[0].id)).size;
    const isLowDiversity = uniqueArtists < 5;

    if (isLateNightListener && isLowDiversity && recent.count > 15) {
        insights.push({
            type: 'burnout',
            title: "Burnout Signal",
            description: "Long listening sessions with low artist diversity during late night hours. This can be a sign of cognitive burnout or avoidant coping.",
            actionLabel: "Wind-down Playlist",
            actionParams: { targetValence: 0.5, targetEnergy: 0.1 },
            severity: 'high'
        });
    }

    // 4. Emotional Regulation (Recovery)
    if (prev) {
        const wasStressed = prev.valence < valenceThreshold && prev.energy > energyThreshold;
        const isRecovering = recent.energy < baseline.avgEnergy && recent.valence >= valenceThreshold;

        if (wasStressed && isRecovering) {
            insights.push({
                type: 'recovery',
                title: "Emotional Regulation",
                description: "You've successfully shifted from high-stress music to calmer, more balanced tones. This shows positive emotional regulation.",
                severity: 'low'
            });
        }
    }

    // 5. Chill Vibes (Low Energy, High Valence)
    if (recent.energy < baseline.avgEnergy - 0.1 && recent.valence > baseline.avgValence + 0.1) {
        insights.push({
            type: 'chill',
            title: "Mindful Harmony",
            description: "You're currently in a peaceful, positive headspace. Your music reflects a state of content relaxation.",
        });
    }

    // 6. Balanced Foundation (If nothing else is detected)
    if (insights.length === 0) {
        insights.push({
            type: 'none',
            title: "Balanced Foundation",
            description: "Your listening patterns are currently stable and balanced. You're using music as a consistent anchor for your emotions.",
            actionLabel: "Maintain the Flow",
            actionParams: { targetValence: 0.5, targetEnergy: 0.5 }
        });
    }

    return insights;
}
