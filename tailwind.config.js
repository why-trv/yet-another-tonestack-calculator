module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
    ],
    theme: {
      fontFamily: {
        'sans': ['retni-sans', '"retni-sans fallback"','-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'sans-serif']
      },
      extend: {
        screens: {
          'xs': '480px',
        },
      },
    },
    plugins: [],
  }