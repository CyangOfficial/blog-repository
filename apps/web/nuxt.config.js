const path = require('path')
export default {
  server: {
    host: 'localhost',
    port: '8080'
  },
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cyang-blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' },
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css' }
    ]
  },

  // axios: {
  //   baseURL: 'http://localhost:3000/api',
  //   prefix: '/api'
  // },

  env: {
    VUE_APP_API_URL: 'http://localhost:3000/api',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'ant-design-vue/dist/antd.css'
    './assets/css/animation.css',
    './assets/css/normalize.css',
    './assets/scss/style.scss',
    './assets/scss/_media.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '@/plugins/antd-ui'
    { src: '@/plugins/svg', mode: 'client' },
    { src: '@/plugins/post-loader', mode: 'client' },
    // { src: '@/plugins/progressive', mode: 'client' },
    // { src: '@/plugins/lazyload', mode: 'client' },
    // { src: '@/plugins/vconsole', mode: 'client' },
    { src: '@/plugins/poly', mode: 'client' },
    { src: '@/plugins/markdown', mode: 'client' },
    { src: '@/plugins/aplayer', mode: 'client' },
    // { src: '@/plugins/axios', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      './assets/scss/_variables.scss',
      './assets/scss/_mixin.scss'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    // transpile: [''],
    extend(config, ctx) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'assets/svg')]
      //添加loader规则
      config.module.rules.push({
        test: /\.svg$/, //匹配.svg
        include: [path.resolve(__dirname, 'assets/svg')], //将存放svg的目录加入到loader处理目录
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]'
          }
        }]
      })
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: "pre",
      //     test: /\.(js|vue)$/,
      //     loader: "eslint-loader",
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
