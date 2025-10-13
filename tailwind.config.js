/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f3f1ff",
          100: "#e9e5ff",
          200: "#d6cfff",
          300: "#b9aaff",
          400: "#163f9c",
          500: "#2563eb", // Main theme color
          600: "#143680",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      backgroundImage: {
        "gradient-image": "url('/bg-signup.png')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
