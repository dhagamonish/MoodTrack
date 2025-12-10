import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tracks, stats } = body;

        if (!genAI) {
            throw new Error("GEMINI_API_KEY is not set");
        }
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are a music psychologist and "Vibe Curator". 
      Analyze this user's listening history and audio statistics to generate a "Sonic Persona".
      
      **Data:**
      - Top Tracks: ${tracks.map((t: any) => `${t.name} by ${t.artists[0].name}`).join(", ")}
      - Audio Stats (0-1 scale except Tempo):
        - Energy: ${stats.energy.toFixed(2)}
        - Valence (Happiness): ${stats.valence.toFixed(2)}
        - Danceability: ${stats.danceability.toFixed(2)}
        - Acousticness: ${stats.acousticness.toFixed(2)}
        - Instrumentalness: ${stats.instrumentalness.toFixed(2)}
        - Tempo: ${Math.round(stats.tempo)} BPM
        
      **Task:**
      1. Analyze these 6 dimensions to create a sophisticated "Sonic Persona" (like Spotify Wrapped).
      2. Create a creative "Persona Title" (e.g., "The Midnight Driver", "Cottagecore Dreamer", "Goblin Mode").
      3. Write a short, poetic 2-sentence description of their current mental state / vibe.
      4. Suggest a hex color code that matches this vibe.
      
      **Output Format (JSON only):**
      {
        "persona": "Title",
        "description": "Description...",
        "hexColor": "#RRGGBB"
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return NextResponse.json(JSON.parse(cleanText));
    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return NextResponse.json({
            persona: "Music Minimalist",
            description: "Your taste defies simple categorization.",
            hexColor: "#1DB954"
        }, { status: 500 });
    }
}
