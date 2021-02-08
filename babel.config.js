module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import', {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      }
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
