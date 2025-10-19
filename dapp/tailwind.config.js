module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
       colors: {
        limeCustom: '#9BE10D',
      },
      fontFamily: {
        outline: ['GoldenVarsityOutline', 'cursive'],
        regular: ['GoldenVarsityRegular', 'sans-serif'],
        scrip:['GoldenVarsityScript', 'cursive'],
      },
       keyframes: {
        'glow-shadow': {
          '0%': { boxShadow: '0 0 0px rgba(34,197,94,0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(34,197,94,0.6)' },
          '100%': { boxShadow: '0 0 100px rgba(34,197,94,0.8)' },
        },
      },
      animation: {
        'glow': 'glow-shadow 0.8s ease-in-out forwards',
      },

    },
  },
  plugins: [],
}
