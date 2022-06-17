const path = require('path')
const WebpackBar = require('webpackbar')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const resolve = function (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  devServer: {
    host: 'localhost',
    port: '8090',
    hot: true,
    open: true,
    // proxy: {
    //   '/api': {
    //     target: 'http:localhost:3000',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@/coms', resolve('src/components'))
    config.optimization.runtimeChunk('single')

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  // pluginOptions: {
  //   // 加载全局scss样式
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: [
  //       path.resolve(__dirname, './src/styles/_variables.scss')
  //     ]
  //   }
  // },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        $env: ${process.env.NODE_ENV};
        @import "src/styles/_variables.scss";
      `
      }
    }
  },
  configureWebpack() {
    return {
      module: {
        rules: [{
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }]
      },
      plugins: [
        new WebpackBar({
          name: 'blog-admin'
        }),
        // Components({
        //   resolvers: [ElementPlusResolver()],
        // })
      ]
    }
  }
}
