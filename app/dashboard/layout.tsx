'use client';

import { Navbar } from '@/components/Navbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-spotify-greenSelection:text-black">
            <Navbar />
            <main className="pt-24 pb-12 px-6 lg:px-12 max-w-[1600px] mx-auto">
                {children}
            </main>
        </div>
    );
}
