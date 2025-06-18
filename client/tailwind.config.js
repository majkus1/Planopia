module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scrollBehavior: ['responsive'], // potrzebne jeśli używasz customowych klas
    },
  },
  plugins: [],
}
