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
        void: "#06080f",
        "void-2": "#0d1117",
        "void-3": "#141b24",
        "void-4": "#1c2535",
        "void-5": "#243041",
        accent: "#3b82f6",
        "accent-dim": "#1d4ed8",
        "accent-glow": "#60a5fa",
        "signal": "#22d3ee",
        "signal-dim": "#0891b2",
        "surface": "#0d1117",
        "border-dim": "rgba(59,130,246,0.15)",
        "border-mid": "rgba(59,130,246,0.3)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan": "scan 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "count-up": "countUp 2s ease-out forwards",
        "border-flow": "borderFlow 3s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", boxShadow: "0 0 20px rgba(59,130,246,0.2)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(59,130,246,0.5)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "grid-void": "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        "radial-accent": "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)",
        "radial-signal": "radial-gradient(ellipse 40% 30% at 80% 60%, rgba(34,211,238,0.06) 0%, transparent 60%)",
      },
      boxShadow: {
        "accent-sm": "0 0 20px rgba(59,130,246,0.25)",
        "accent-md": "0 0 40px rgba(59,130,246,0.3)",
        "accent-lg": "0 0 80px rgba(59,130,246,0.25)",
        "signal-sm": "0 0 20px rgba(34,211,238,0.2)",
        "card": "0 1px 0 rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
