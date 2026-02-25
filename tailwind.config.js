export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Align Tailwind tokens with the app's luxury wine theme (see src/styles/theme.css)
        primary: "#5a0f1c",
        primaryDark: "#3d0a13",
        gold: "#d4af37",
        // Beige background (avoid pink cast)
        accent: "#f3e7d9",
      },
    },
  },
  plugins: [],
};
