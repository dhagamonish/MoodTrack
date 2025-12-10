'use client';

import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white p-4">
            <h1 className="text-4xl font-black text-tactile mb-4">Dashboard</h1>
            <p className="text-gray-400 mb-8 text-center max-w-md">
                This is where the user's mood analysis would verify and display (if we had the backend exchange implementation).
            </p>
            <Button variant="clay" onClick={() => window.location.href = '/'}>
                Back to Home
            </Button>
        </div>
    )
}
