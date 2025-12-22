import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Logo } from '@/components/Logo'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'MoodTrack | Music-Based Mental Wellness',
    description: 'Analyze your Spotify listening habits to reveal emotional patterns.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={cn(inter.variable, "antialiased bg-neutral-950")}>
                <Logo />
                {children}
            </body>
        </html>
    )
}
