import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: "#1DB954",
          emerald: "#0E3E2F",
          black: "#0A0A0A",
          gray: "#222222",
          lime: "#94FFCF",
        },
        sunset: {
          violet: "#A47DFF",
          magenta: "#FF4EDB",
          orange: "#FFB347",
        },
      },
      boxShadow: {
        "tactile": "0 20px 80px rgba(0,0,0,0.3)",
        "clay": "inset 10px 10px 20px rgba(255,255,255,0.1), inset -10px -10px 20px rgba(0,0,0,0.2), 10px 20px 40px rgba(0,0,0,0.4)",
        "clay-sm": "inset 5px 5px 10px rgba(255,255,255,0.1), inset -5px -5px 10px rgba(0,0,0,0.2), 5px 10px 20px rgba(0,0,0,0.3)",
        "puffy": "0 10px 30px -10px rgba(29, 185, 84, 0.5)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      animation: {
        "soft-bounce": "bounce-sm 3s infinite ease-in-out",
        "float": "float 6s ease-in-out infinite",
        "wobble-slow": "wobble 8s ease-in-out infinite",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "bounce-sm": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
      backgroundImage: {
        "mesh-gradient": "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
