# vue-study-leave-app
这是我第一次用vue做一个小软件，就是今日校园的请假模块，

这里没有使用到访问服务器接口，关于存储请假的相关记录，只是使用了localStorage技术，
存储到本地。没什么真实价值的软件，只是为了将所学的vue相关技术串联起来做一个小东西，

使用的vue相关技术 store,router,component基本上都用上了一点




最后可以打包成为一个app

步骤如下
1.在项目根目录创建一个文件vue.config.js,内容如下,直接复制即可
```
    const path = require("path");
    const resolve = function(dir) {
      return path.join(__dirname, dir);
    };
    module.exports = {
      publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
      outputDir: "dist",
      assetsDir: "static",
      lintOnSave: true, // 是否开启eslint保存检测
      productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
      chainWebpack: config => {
        config.resolve.alias
          .set("@", resolve("src"))
          .set("@v", resolve("src/views"))
          .set("@c", resolve("src/components"))
          .set("@u", resolve("src/utils"))
          .set("@s", resolve("src/service")); /* 别名配置 */
        config.optimization.runtimeChunk("single");
      },
      devServer: {
        // host: "localhost",
        /* 本地ip地址 */
        //host: "192.168.1.107",
        host: "0.0.0.0", //局域网和本地访问
        port: "8888",
        hot: true,
        /* 自动打开浏览器 */
        open: false,
        overlay: {
          warning: false,
          error: true
        },

      }
    };
```

2.修改router下的index.js，将 mode改为hash，不要history，否则不能正常访问
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

3.执行npm run build  可以将其生成 dist文件夹，里面其实已经可以正常使用了，
将该文件夹下的所有东西复制粘贴到hbuild创建的移动app项目下替换即可，然后点击
上方工具栏的发行，云打包安卓即可。

