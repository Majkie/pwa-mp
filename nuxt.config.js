export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TODO: Manage your time',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    'portal-vue/nuxt'
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyBpBRbuDH3SaAIV4BWB0yYaTveW2NKx2tA",
      authDomain: "pwa-blog-mp-2021.firebaseapp.com",
      databaseURL: "https://pwa-blog-mp-2021-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "pwa-blog-mp-2021",
      storageBucket: "pwa-blog-mp-2021.appspot.com",
      messagingSenderId: "1031126899825",
      appId: "1:1031126899825:web:1d2370ef02d06878454fd0"
    },
    services: {
      auth: true,
      database: true
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'TODO: Manage your time',
      short_name: 'TODOS',
      lang: 'en',
      description: 'Manage your time using todo list using any device.',
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
