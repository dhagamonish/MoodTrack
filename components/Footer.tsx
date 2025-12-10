export function Footer() {
    return (
        <footer className="py-12 bg-black text-center relative border-t border-white/5">
            <div className="absolute inset-0 bg-noise opacity-10" />
            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-2xl font-black text-white tracking-tighter">MoodTrack</div>

                <div className="flex gap-8 text-sm font-medium text-gray-500">
                    <a href="#" className="hover:text-spotify-green transition-colors">Privacy</a>
                    <a href="#" className="hover:text-spotify-green transition-colors">Terms</a>
                    <a href="#" className="hover:text-spotify-green transition-colors">Contact</a>
                </div>

                <div className="text-xs text-gray-600">
                    &copy; 2025 MoodTrack. Not affiliated with Spotify AB.
                </div>
            </div>
        </footer>
    )
}
