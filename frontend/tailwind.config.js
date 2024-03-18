/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        defaultHeader: "62px",
      },
      margin: {
        marginTopHeader: "62px",
      },
      colors: {
        primary: '#00b14f',
        bgDark: "#0f172a",
        bgModal: "#ccc"
      },
      boxShadow: {
        bxShadowPrimary: "0 4px 16px rgba(0,0,0,.08)"
      }
    },
  },
  plugins: [],
}