
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || 'infobot',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      },
    ]
  },
  axios: {
    baseURL: 'https://infobot-7a6a4.firebaseio.com/',
    browserBaseURL: 'https://infobot-7a6a4.firebaseio.com/',
    // proxyHeaders: false,
    // credentials: false,
    headers: {
      common: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',


      }
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  ** Global CSS
  */
  css: ["assets/style/main.css"],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/ui-components.js', '~/plugins/fire.js'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    "@nuxtjs/axios",
    "nuxt-quasar",
    [
      'nuxt-fontawesome', {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }],


  ],
  // fire: {
  //   env: 'development',
  //   apiKey: 'AIzaSyBw2jzg4gx53-0zVeCox6xKRuWSouUFwXc',
  //   authDomain: 'https://infobot-7a6a4.firebaseio.com/',
  //   databaseURL: 'https://infobot-7a6a4.firebaseio.com/',
  //   projectId: 'infobot-7a6a4',
  //   // storageBucket: '<storageBucket>',
  //   messagingSenderId: '1094257663093',
  //   appId: 'project-1094257663093',
  //   messaging: true,
  //   // measurementId: '<measurementId>'

  // },
  // messaging: true,
  // quasar css components
  quasar: {
    framework: {
      iconSet: "fontawesome-v5",
      components: [
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QSelect',
        "QList",
        "QItem",
        "QForm",
        "QInput",
        "QIcon",
        "QBtn",
        "QBtnToggle"
      ],
      cssAddon: true
    },
    supportIE: true,
    htmlVariables: {}
  },

  router: {
    linkActiveClass: 'active',
    middleware: 'route-compare',
  },


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
