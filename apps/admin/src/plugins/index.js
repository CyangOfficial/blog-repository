/**
 * @description 加载所有 Plugins，导出loadAllPlugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 * ReturnType<T> -- 获取函数返回值类型。 typeof createApp 返回function
 */
export function loadAllPlugins (app) {
  // ./ 找到当前目录下以.js结尾的文件
  const files = require.context('./', true, /\.js$/)
  // console.log(files.keys()) // ["./element.ts", "./index.ts"]
  files.keys().forEach(key => {
    if (key !== './index.js') {
      // eslint-disable-next-line no-irregular-whitespace
      // console.log(files(key)) Module {__esModule: true, Symbol(Symbol.toStringTag): "Module"}
      files(key).default(app)
    }
  })
}
