
interface Track {
    id: string;
    name: string;
    artists: { id: string, name: string }[];
    played_at: string;
    duration_ms: number;
}

interface AudioFeatures {
    id: string;
    valence: number;
    energy: number;
    danceability: number;
    acousticness: number;
    tempo: number;
    loudness: number;
    speechiness: number;
}

export interface DailyMetric {
    date: string;
    valence: number;
    energy: number;
    count: number;
    listeningTimeMinutes: number;
    diversity: number; // unique tracks / total plays
    lateNightRatio: number; // tracks played 11pm-4am / total
}

export interface Insight {
    type: 'streak' | 'stress' | 'burnout' | 'recovery' | 'chill' | 'volatility' | 'numbing' | 'overstimulation' | 'none';
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
    avgListeningTime: number;
    avgDiversity: number;
}

export function calculatePersonalBaseline(metrics: DailyMetric[]): PersonalBaseline {
    if (metrics.length === 0) return {
        avgValence: 0.5,
        avgEnergy: 0.5,
        stdValence: 0.1,
        stdEnergy: 0.1,
        avgListeningTime: 60,
        avgDiversity: 0.8
    };

    const avgValence = metrics.reduce((acc, m) => acc + m.valence, 0) / metrics.length;
    const avgEnergy = metrics.reduce((acc, m) => acc + m.energy, 0) / metrics.length;
    const avgListeningTime = metrics.reduce((acc, m) => acc + m.listeningTimeMinutes, 0) / metrics.length;
    const avgDiversity = metrics.reduce((acc, m) => acc + m.diversity, 0) / metrics.length;

    const stdValence = Math.sqrt(metrics.reduce((acc, m) => acc + Math.pow(m.valence - avgValence, 2), 0) / metrics.length) || 0.1;
    const stdEnergy = Math.sqrt(metrics.reduce((acc, m) => acc + Math.pow(m.energy - avgEnergy, 2), 0) / metrics.length) || 0.1;

    return { avgValence, avgEnergy, stdValence, stdEnergy, avgListeningTime, avgDiversity };
}

export function processListeningHistory(recentlyPlayedItems: any[], audioFeatures: any[]) {
    const featuresMap = new Map();
    audioFeatures.forEach(f => {
        if (f) featuresMap.set(f.id, f);
    });

    const richHistory = recentlyPlayedItems.map(item => {
        const feature = featuresMap.get(item.track.id);
        return {
            track: item.track,
            played_at: item.played_at,
            features: feature
        };
    }).filter(item => item.features);

    return richHistory;
}

export function calculateDailyMetrics(richHistory: any[]): DailyMetric[] {
    const dailyMap = new Map<string, {
        weightedValence: number,
        weightedEnergy: number,
        totalDuration: number,
        tracks: string[],
        lateNightCount: number,
        count: number
    }>();

    richHistory.forEach(item => {
        const date = new Date(item.played_at).toISOString().split('T')[0];
        const hour = new Date(item.played_at).getHours();
        const duration = item.track.duration_ms || 180000;

        const current = dailyMap.get(date) || {
            weightedValence: 0,
            weightedEnergy: 0,
            totalDuration: 0,
            tracks: [],
            lateNightCount: 0,
            count: 0
        };

        const isLateNight = hour >= 23 || hour <= 4;

        dailyMap.set(date, {
            weightedValence: current.weightedValence + (item.features.valence * duration),
            weightedEnergy: current.weightedEnergy + (item.features.energy * duration),
            totalDuration: current.totalDuration + duration,
            tracks: [...current.tracks, item.track.id],
            lateNightCount: current.lateNightCount + (isLateNight ? 1 : 0),
            count: current.count + 1
        });
    });

    const metrics: DailyMetric[] = Array.from(dailyMap.entries()).map(([date, data]) => ({
        date,
        valence: data.weightedValence / data.totalDuration,
        energy: data.weightedEnergy / data.totalDuration,
        count: data.count,
        listeningTimeMinutes: data.totalDuration / 60000,
        diversity: new Set(data.tracks).size / data.count,
        lateNightRatio: data.lateNightCount / data.count
    }));

    return metrics.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function detectPatterns(metrics: DailyMetric[], richHistory: any[], baseline: PersonalBaseline): Insight[] {
    const insights: Insight[] = [];
    if (metrics.length === 0) return insights;

    const recent = metrics[metrics.length - 1];
    const historicalTail = metrics.slice(-5); // Last 5 days for trend analysis

    // 1. Low Mood Trend (Sustained deviation)
    const lowMoodDays = historicalTail.filter(m => m.valence < baseline.avgValence - 0.5 * baseline.stdValence);
    if (lowMoodDays.length >= 4) {
        insights.push({
            type: 'streak',
            title: "Low Energy – Mood Trend",
            description: "Your recent listening has been lower-energy and lower-valence than your usual pattern for several days. This is an observation of a sustained shift from your baseline.",
            actionLabel: "Low Energy Reset",
            actionParams: { targetValence: baseline.avgValence + 0.2, targetEnergy: baseline.avgEnergy - 0.1 },
            severity: 'medium'
        });
    }

    // 2. Stress Pattern (High arousal + Low reward + Repetition)
    const isStressed = recent.energy > baseline.avgEnergy + 0.5 * baseline.stdEnergy &&
        recent.valence < baseline.avgValence &&
        recent.diversity < baseline.avgDiversity * 0.8;

    if (isStressed || (recent.lateNightRatio > 0.4 && recent.diversity < 0.5)) {
        insights.push({
            type: 'stress',
            title: "Stress Pattern Detected",
            description: "Your listening patterns show high energy, low reward, and high repetition—often linked to stress regulation. Late-night looping can disrupt recovery.",
            actionLabel: "Calm Regulation Mix",
            actionParams: { targetValence: 0.6, targetEnergy: 0.2, targetAcousticness: 0.7 },
            severity: 'high'
        });
    }

    // 3. Emotional Volatility (Large swings)
    if (metrics.length >= 3) {
        const last3 = metrics.slice(-3);
        const swings = Math.abs(last3[2].valence - last3[1].valence) + Math.abs(last3[1].valence - last3[0].valence);
        if (swings > 0.4) {
            insights.push({
                type: 'volatility',
                title: "Emotional Volatility",
                description: "Large day-to-day mood swings detected in your sonic signature. Music today is acting as an emotional pendulum.",
                actionLabel: "Grounding Playlist",
                actionParams: { targetValence: baseline.avgValence, targetEnergy: 0.3 }
            });
        }
    }

    // 4. Overstimulation (High energy + High loudness)
    const recentTracks = richHistory.slice(0, 10);
    const avgTrackEnergy = recentTracks.reduce((acc, t) => acc + t.features.energy, 0) / 10;
    if (avgTrackEnergy > 0.85) {
        insights.push({
            type: 'overstimulation',
            title: "Overstimulation Alert",
            description: "You're leaning into very high-intensity stimuli. Notice if this is providing focus or causing sensory fatigue.",
            actionLabel: "Soft Acoustic Shift",
            actionParams: { targetEnergy: 0.4, targetAcousticness: 0.8 },
            severity: 'low'
        });
    }

    // 5. Calm Regulation (Positive shift)
    if (metrics.length >= 2) {
        const prev = metrics[metrics.length - 2];
        if (prev.energy > baseline.avgEnergy && recent.energy < baseline.avgEnergy && recent.valence >= baseline.avgValence) {
            insights.push({
                type: 'recovery',
                title: "Calm Regulation",
                description: "Positive shift detected: You've moved from higher tension to a more regulated, calm emotional state.",
                severity: 'low'
            });
        }
    }

    // 6. Emotional Numbing (Flat valence + High repetition)
    if (recent.diversity < 0.3 && Math.abs(recent.valence - baseline.avgValence) < 0.05) {
        insights.push({
            type: 'numbing',
            title: "Emotional Numbing",
            description: "Flat emotional response and extreme repetition detected. This can sometimes be a sign of emotional detachment or 'autopilot' mode.",
            actionLabel: "Novelty Injection",
            actionParams: { targetValence: 0.7, targetEnergy: 0.6 }
        });
    }

    if (insights.length === 0) {
        insights.push({
            type: 'none',
            title: "Balanced Foundation",
            description: "Your listening patterns are currently stable and match your personal baseline. You're using music as a consistent anchor.",
            actionLabel: "Maintain Flow",
            actionParams: { targetValence: baseline.avgValence, targetEnergy: baseline.avgEnergy }
        });
    }

    return insights;
}
