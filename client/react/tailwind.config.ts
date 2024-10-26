import { type Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Patua One"],
        second: ["Comfortaa"],
        third: ["Merriweather"],
      },
      colors: {
        transparent: "transparent",
        inherit: "inherit",
        current: "currentColor",
        realwhite: "#ffffff",
        realblack: "#000000",
        almostblack: "#121212",
        primary: {
          1: "#FAD1A4",
          2: "#F7B974",
          3: "#D1A4FA",
          4: "#CDFAA4",
          5: "#B974F7",
          6: "#F7B974",
        },
        secondary: {
          1: "#604cfc",
          2: "#74B2F7",
        },
        neutral: {
          1: "#f3f4f6",
          2: "#F5F5F5",
          3: "#B2B2B2",
          4: "#EBEBEB",
          5: "#212121",
          6: "#161618",
          7: "#1E1E1E",
          8: "#232326",
          9: "#28282c",
          10: "#2e2e32",
          11: "#34343a",
          12: "#3d3d3d",
          13: "#5E7076",
          14: "#9D9D9D",
          15: "#6A6A6A",
          16: "#E5E5E5",
          17: "#CDCDCD",
          18: "#8E8E8E",
          19: "#A1A1A1",
          20: "#292929",
          21: "#424242",
          22: "#F8F8F8",
          23: "#DFDFDF",
          24: "#1a1a1b",
          25: "#2f2f31",
          26: "#dcdcdc",
          27: "#121213",
        },
        success: {
          1: "#10b981",
        },
        error: {
          1: "#be123c",
        },
        warn: {
          1: "#FBD486",
          2: "#FFFAEB",
          3: "#FEC84B",
        },
        sleek: {
          primary: "#13161b",
          secondary: "#1c1f25",
          tertiary: "#282c34",
          neutral: "#8e97a8",
          neutral2: "#1c1f25",
          dark: "#0d0e12",
        },
        game: {
          list: {
            1: "#bbf7d0",
            2: "#fed7aa",
            3: "#bae6fd",
            4: "#e9d5ff",
            5: "#fbcfe8",
            6: "#99f6e4",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
