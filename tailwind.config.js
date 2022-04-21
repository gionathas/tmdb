const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
        dark: "#101012",
        "dark-blue": "#042541",
      },
      objectPosition: {
        "center-top": "50% 12%",
        "center-bottom": "center bottom",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
