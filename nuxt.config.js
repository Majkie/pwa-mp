export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: 'index.html'
  },

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
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript. Please enable it and refresh the page.'}
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
    '@nuxtjs/firebase',
    'portal-vue/nuxt',
    '@nuxtjs/pwa',
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyC5Rlo7GcGKfKZes-CH7TkMQStNdp0P_vA",
      authDomain: "pwa-mp-2021.firebaseapp.com",
      databaseURL: "https://pwa-mp-2021-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "pwa-mp-2021",
      storageBucket: "pwa-mp-2021.appspot.com",
      messagingSenderId: "962548970571",
      appId: "1:962548970571:web:044a820b43d71dfbb849ce"
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
      theme_color: '#FFFFFF'
    },
  },


  // 1.5s Preload component, Firebase is slow as fu**
  loading: '~/components/LoadingComponent.vue',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
