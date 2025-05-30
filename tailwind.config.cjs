/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
        ultra: "1600px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#204807",
        secondary: "#222831",
        third: "#FFFDF6",
        accent: "#63734A",
        tertiary: "#E1E8CA",
        dark_green: "#1E2203",
        black: "#131717",
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        scrollRight: "scrollRight 100s linear infinite",
        scrollLeft: "scrollLeft 100s linear infinite",
      },
    },
  },
  plugins: [],
};
