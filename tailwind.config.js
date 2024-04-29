/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,hbs}"],
  theme: {
    extend: {
      backgroundImage: {
        workspace: 'url("/public/images.jpg")',
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
