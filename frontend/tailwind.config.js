/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: "#00f2ff",
          purple: "#bc13fe",
          dark: "#020617",
          card: "rgba(15, 23, 42, 0.7)",
          border: "rgba(0, 242, 255, 0.2)",
        },
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
        "neon-gradient": "linear-gradient(90deg, #00f2ff, #bc13fe)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanner": "scan 3s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { top: "0%" },
          "50%": { top: "100%" },
        },
      },
    },
  },
  plugins: [],
}

