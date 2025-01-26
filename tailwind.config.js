/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        harrierBLUE: "#70CAF2",
        harrierPINK: "#DB2877",
        harrierBLACK: "#28282A",
        harrierWHITE: "#FFFFFF",
        harrierGRAY: "#9ca3af",
        harrierYELLOW: "#FEE01B",
        harrierOFFWHITE: "#ececec",
        harrierLINKBLUE: "#3b82f6",
        harrierGHABLUE: "#2088FE",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
