import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D87D4A", // main accent (orange-brown)
          light: "#FBAF85", // lighter accent
        },
        black: {
          DEFAULT: "#101010",
          pure: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
          off: "#FAFAFA",
        },
        gray: {
          100: "#F1F1F1",
          200: "#FAFAFA",
          900: "#101010",
        },
        error: "#CD2C2C",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      fontSize: {
        h1: [
          "56px",
          {
            lineHeight: "58px",
            letterSpacing: "2px",
            fontWeight: "700",
          },
        ],
        h2: [
          "40px",
          {
            lineHeight: "44px",
            letterSpacing: "1.5px",
            fontWeight: "700",
          },
        ],
        h3: [
          "32px",
          {
            lineHeight: "36px",
            letterSpacing: "2px",
            fontWeight: "700",
          },
        ],
        h4: [
          "28px",
          {
            lineHeight: "38px",
            letterSpacing: "2px",
            fontWeight: "700",
          },
        ],
        h5: [
          "24px",
          {
            lineHeight: "33px",
            letterSpacing: "1.7px",
            fontWeight: "700",
          },
        ],
        h6: [
          "18px",
          {
            lineHeight: "24px",
            letterSpacing: "1.3px",
            fontWeight: "700",
          },
        ],
        body: ["15px", { lineHeight: "25px", fontWeight: "500" }],
        overline: [
          "14px",
          { lineHeight: "19px", letterSpacing: "10px", fontWeight: "400" },
        ],
        subtitle: [
          "13px",
          { lineHeight: "25px", letterSpacing: "1px", fontWeight: "700" },
        ],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        card: "0 4px 16px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config satisfies Config;

