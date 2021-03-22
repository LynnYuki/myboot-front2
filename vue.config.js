const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const {BundleAnalyzerPlugin}  = require('webpack-bundle-analyzer')
const { resolveCname } = require('dns')

const productionGzipExtension = ['js','css','html']
const plugin = []
const resolve = (dir) => path.join(__dirname,dir)
const title = process.env.VUE_APP_TITLE
/**Gzip 压缩开启，必须同时开启Nginx Gzip */
if(process.env.NODE_ENV === 'production'){
  plugins.push(
    new CompressionWebpackPlugin({
      filename:'[path].gz[query]',
      algorithm:'gzip',
      text:new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
      threshold:10240,
      minRatio:0.8,
      deleteOriginalAssetes:false,
    })
  )
}

module.exports = {
  publicPath: '/',
  outputDir: 'myboot-front2',
  lintOnSave: process.env.NODE_ENV !== 'development',
  assetsDir:'static',
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
    open: 'chrome',
    https:false,
    historyApiFallBack:true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_HOST,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  css:{
    extract:true,
    sourceMap:false,
    loaderOptions:{
      sass:{
        // prependData:`@import"~@/styles/variables.css";`,
      }
    }
  },

  configureWebpack:{
    resolve:{
      alias:{
        '@':resolve('src'),
        '@':resolve('src/components')
      }
    },
    extensions:['.js'],
    modules:[resolve('src'),'node_modules'],
    plugins:plugins,
  },

  chainWebpack:(config)=>{
    config.plugin('html').tap((args)=>{
      args[0].title = title
      return args
    })

    config.module
    .rule('vue') 
    .use('vue-loader')
    .loader('vue-loader')
    .tap((options)=>{
      options.compileOptions.preserveWhitespace = true
      return options
    })

    config.optimization.runtimeChunk('single')
  }, 



  
  // 打包去除console.log
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0]
        .options.terserOptions.compress.drop_console = true
    }
  }
}
