/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: { max: "640px" },
      md: { max: "1024px" },
      lg: "1025px",
    },
    colors: {
      background: "#20293A",
      primary: "#111629",
      transparent: "transparent",
      text: "#CDD5E0",
      secondary: "#4A5567",
      card: "linear-gradient(90deg, #111629 0%, #1D1B48 100%)",
      ring: "#3662E3",
    },
    extend: {},
  },
  plugins: [],
};
