//开发时依赖
const prodplugin = []
if (process.env.NODE_ENV === 'production') {
  prodplugin.push('transform-remove-console')
}

module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    ...prodplugin,
    //懒加载
    '@babel/plugin-syntax-dynamic-import'
  ]
}