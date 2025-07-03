module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      {
        light: {
          primary: "#0e4677",
          secondary: "#FF0000",
          neutral: "#444",
          "neutral-content": "#757872",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
