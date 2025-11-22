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
      // colors: {
      //   primary: "#204807",
      //   secondary: "#222831",
      //   third: "#FFFDF6",
      //   accent: "#63734A",
      //   tertiary: "#E1E8CA",
      //   dark_green: "#1E2203",
      //   black: "#131717",
      //   grey: "#909690ff",
      //   lightGrey: "#f1f4f4ff",
      //   red: "#E43636",
      //   cartRed: "#D96F32",
      //   darkCartRed: "#873b0eff",
      //   lightGreen: "#287d0bff",
      //     lowStock: "#eabb14ff",
      // }
      colors: {
        // -----------------------------------
        // BRAND (brand-700 Identity Colors)
        // -----------------------------------
        brand: {
          900: "#1E2203", // deep forest
          700: "#204807", // brand-700
          500: "#63734A", // accent
          100: "#E1E8CA", // light brand tone
        },

        // -----------------------------------
        // SURFACE / UI BACKGROUNDS
        // -----------------------------------
        surface: {
          base: "#FFFDF6", // main background
          raised: "#f1f4f4ff", // cards / panels
        },

        // -----------------------------------
        // TEXT COLORS
        // -----------------------------------
        text: {
          primary: "#131717",
          secondary: "#222831",
          muted: "#909690ff",
          inverse: "#FFFDF6",
        },
        success: {
          700: "#1d5b08", // darker (hover)
          500: "#287d0bff", // main (DEFAULT)
          300: "#4cb52cff", // lighter
        },

        warning: {
          700: "#b88e0f", // darker (hover)
          500: "#eabb14ff", // main
          300: "#f2d861", // lighter
        },

        error: {
          700: "#b12a2a", // darker (hover)
          500: "#E43636", // main
          300: "#f17878", // lighter
          100: "#fde7e7",
        },

        cart: {
          700: "#873b0eff", // dark
          500: "#D96F32", // main
          300: "#f3a477", // light
        },

        icon: {
          blue: {
            600: "#2563EB", // droplets icon
            100: "#e4edff", // matching bg
          },
          amber: {
            600: "#D97706",
            100: "#fff1d1",
          },
          cyan: {
            600: "#0891B2",
            100: "#d5f4fb",
          },
          emerald: {
            600: "#059669",
            100: "#d4f7ec",
          },
        },
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
