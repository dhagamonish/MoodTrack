import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tracks, stats } = body;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are a music psychologist and "Vibe Curator". 
      Analyze this user's listening history and audio statistics to generate a "Sonic Persona".
      
      **Data:**
      - Top Tracks: ${tracks.map((t: any) => `${t.name} by ${t.artists[0].name}`).join(", ")}
      - Audio Stats (0-1 scale):
        - Energy: ${stats.energy.toFixed(2)}
        - Valence (Happiness): ${stats.valence.toFixed(2)}
        - Danceability: ${stats.danceability.toFixed(2)}
        
      **Task:**
      1. Create a creative "Persona Title" (e.g., "The Midnight Driver", "Cottagecore Dreamer").
      2. Write a short, poetic 2-sentence description of their current mental state / vibe.
      3. Suggest a hex color code that matches this vibe.
      
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
