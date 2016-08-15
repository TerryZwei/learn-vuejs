## Demo01:

入口文件定义了Webpack将会读的内容和构建成bundle.js

例如, `main.js` 是一个入口文件

```javascript
// main.js
document.write('<h1>Hello World</h1>');
```

index.html

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

Webpack 根据 `webpack.config.js` 配置构建 `bundle.js`.

```javascript
// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

启动服务, 浏览 http://127.0.0.1:8080 .

```bash
$ webpack-dev-server
```
## Demo02:

入口文件允许有多个，这对于多页面应用来说非常有用.

```javascript
// main1.js
document.write('<h1>Hello World</h1>');

// main2.js
document.write('<h2>Hello Webpack</h2>');
```

index.html

```html
<html>
  <body>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }
};
```
## Demo03: 

Loaders 是改变你的应用所引用的资源文件的预处理器 ([more info](http://webpack.github.io/docs/using-loaders.html)). 例如, [Babel-loader](https://www.npmjs.com/package/babel-loader)能够把JSX/ES6文件转换成普通的js文件. 官方文档有一个完整的关于loaders[loaders](http://webpack.github.io/docs/list-of-loaders.html)的列表 .

`main.jsx` 是一个JSX文件

```javascript
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);
```

index.html

```html
<html>
  <body>
    <div id="wrapper"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ]
  }
};
```

在 `webpack.config.js`中, `module.loaders` 内容被用来指派loader.以上的代码片段使用  `babel-loader` 使用插件 [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) 和 [babel-preset-react](https://www.npmjs.com/package/babel-preset-react) 去识别ES6 和 React.你也能通过其它的方式去设置babel识别条件.

```javascript
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
}
```
