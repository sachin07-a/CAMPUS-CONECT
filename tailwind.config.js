/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          royalblue: "#243BDB",
          indigo: "#4338CA",
          purple: "#7C3AED",
          electric: "#19A7E8",
          teal: "#14B8A6",
          gold: "#FBBF24",
          pink: "#EC4899",
          DEFAULT: "#243BDB",
        },
        campus: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          text: "#0F172A",
          muted: "#64748B",
          border: "#E2E8F0",
          surface: "#F1F5F9",
          darkbg: "#0B1020",
          darkcard: "#111827",
          darktext: "#F8FAFC",
          darkmuted: "#CBD5E1",
          darkborder: "#1F2937",
          darksurface: "#1E293B",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #243BDB 0%, #4338CA 50%, #7C3AED 100%)",
        "gradient-accent": "linear-gradient(135deg, #19A7E8 0%, #4338CA 50%, #7C3AED 100%)",
        "gradient-gold": "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
        "gradient-pink": "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
        "gradient-teal": "linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)",
      },
      boxShadow: {
        "soft": "0 2px 10px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)",
        "card": "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        "glow": "0 0 25px -5px rgba(36, 59, 219, 0.35)",
        "glow-purple": "0 0 25px -5px rgba(124, 58, 237, 0.35)",
      },
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
        "3xl": "24px",
      }
    },
  },
  plugins: [],
}
