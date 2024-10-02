export default defineNuxtConfig({
  srcDir: 'src/',
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    buildAssetsDir: '/_/',
  }
})