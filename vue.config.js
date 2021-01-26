module.exports = {
  publicPath: '/',
  outputDir: 'myboot-front2',
  lintOnSave: process.env.NODE_ENV !== 'development',
  productionSourceMap: false,
  // 开启less支持
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  // 设置开发环境跨域代理，生产环境不生效
  devServer: {
    host: '0.0.0.0',
    port: '8088',
    open: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_HOST,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 打包去除console.log
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0]
        .options.terserOptions.compress.drop_console = true
    }
  }
}
