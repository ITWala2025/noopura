/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          midnight: "#090B1A",
          deep: "#10142E",
          royal: "#1A2147",
          velvet: "#232B5C",
        },
        gold: {
          temple: "#D4AF37",
          bright: "#F4D36E",
          antique: "#A88424",
          shimmer: "#FCE8A6",
        },
        alta: {
          deep: "#6D0F1B",
          crimson: "#9E1B2B",
          rose: "#C83246",
          glow: "#E05265",
        },
        ivory: {
          silk: "#FBF8F1",
          warm: "#F3EBDD",
          muted: "#C8C2B8",
        },
        sage: {
          mist: "#EEF4EE",
          celadon: "#DCE7DD",
          soft: "#C1D5C5",
          moss: "#6F8F77",
          forest: "#2C4236",
          deep: "#1B2A22",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "jewel-radial":
          "radial-gradient(ellipse at top, rgba(212, 175, 55, 0.16), transparent 55%), radial-gradient(ellipse at bottom right, rgba(158, 27, 43, 0.22), transparent 55%)",
        "gold-sheen":
          "linear-gradient(135deg, #F4D36E 0%, #D4AF37 45%, #A88424 100%)",
        "alta-sheen":
          "linear-gradient(135deg, #C83246 0%, #9E1B2B 50%, #6D0F1B 100%)",
        "gloss-card":
          "linear-gradient(155deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 45%, rgba(212,175,55,0.05) 100%)",
      },
      boxShadow: {
        gloss:
          "0 20px 50px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.18)",
        "gold-glow": "0 0 32px -4px rgba(212, 175, 55, 0.38)",
        "alta-glow": "0 0 32px -4px rgba(158, 27, 43, 0.55)",
      },
      animation: {
        "pulse-slow": "pulse 3.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
