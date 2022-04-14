const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
        dark: "#101012",
        "dark-blue": "#042541",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
