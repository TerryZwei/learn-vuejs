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
## Demo04: CSS-loader

Webpack允许通过require的形式在JS文件引入CSS,通过CSS-loader对CSS文件进行预处理.

main.js

```javascript
require('./app.css');
```

app.css

```css
body {
  background-color: blue;
}
```

index.html

```html
<html>
  <head>
    <script type="text/javascript" src="bundle.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
};
```

需要注意的是,你需要使用两个loaders去转变CSS文件.第一个是 [CSS-loader](https://www.npmjs.com/package/css-loader) 去读取CSS文件内容,另外一个是 [Style-loader](https://www.npmjs.com/package/style-loader) 插入Style标签到HTML页面. 不同的loaders之间通过感叹号(!)连接.

启动服务之后, `index.html` 将会拥有内联的样式.

```html
<head>
  <script type="text/javascript" src="bundle.js"></script>
  <style type="text/css">
    body {
      background-color: blue;
    }
  </style>
</head>
```

## Demo05: Image loader

Webpack在JS文件里通过require的形式引用图片.

main.js

```javascript
var img1 = document.createElement("img");
img1.src = require("./small.png");
document.body.appendChild(img1);

var img2 = document.createElement("img");
img2.src = require("./big.png");
document.body.appendChild(img2);
```

index.html

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};
```

[url-loader](https://www.npmjs.com/package/url-loader) 转换图片文件. 如果图片的大小小于8192 bytes, 图片会被转换成数据资源地址的形式; 其他情况下, 图片会转换成普通的资源地址. 正如你所看到的, 通过使用问号(?)传递参数给loaders.

启动服务后, `small.png` 和 `big.png` 资源地址将会变成以下的URLs.

```html
<img src="data:image/png;base64,iVBOR...uQmCC">
<img src="4853ca667a2b8b8844eb2693ac1b2578.png">
```
## Demo06: CSS Module

`css-loader?modules` (参数modules) 使 [CSS Modules](https://github.com/css-modules/css-modules) 遵循模块规范.

这意味着默认你引用的css是局部作用域的CSS. 通过使用 `:global(...)` 屏蔽掉选择器和规则. ([more info](https://css-modules.github.io/webpack-demo/))

index.html

```html
<html>
<body>
  <h1 class="h1">Hello World</h1>
  <h2 class="h2">Hello Webpack</h2>
  <div id="example"></div>
  <script src="./bundle.js"></script>
</body>
</html>
```

app.css

```css
.h1 {
  color:red;
}

:global(.h2) {
  color: blue;
}
```

main.jsx

```javascript
var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');

ReactDOM.render(
  <div>
    <h1 className={style.h1}>Hello World</h1>
    <h2 className="h2">Hello Webpack</h2>
  </div>,
  document.getElementById('example')
);
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
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  }
};
```

启动服务.

```bash
$ webpack-dev-server
```

浏览 http://127.0.0.1:8080 , 你会发现只有第二个 `h1` 是红色的, 因为它的CSS是局部作用域, 而两个 `h2` 都是蓝色的, 因为它的CSS是全局作用域.

## Demo07: UglifyJs Plugin 

Webpack有一个系统插件去扩展它的方法. 例如, [UglifyJs Plugin](http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) 能够压缩输出到(`bundle.js`) JS代码.

main.js

```javascript
var longVariableName = 'Hello';
longVariableName += ' World';
document.write('<h1>' + longVariableName + '</h1>');
```

index.html

```html
<html>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

webpack.config.js

```javascript
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
```
启动服务后, `main.js` 将会被压缩如下.

```javascript
var o="Hello";o+=" World",document.write("<h1>"+o+"</h1>")
```

## Demo08: HTML Webpack Plugin and Open Browser Webpack 

这个例子展示如何加载第三方插件.

[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) 能够为你创建 `index.html`, 和 [open-browser-webpack-plugin](https://github.com/baldore/open-browser-webpack-plugin) 能够打开浏览器当Webpack运行时.

main.js

```javascript
document.write('<h1>Hello World</h1>');
```

webpack.config.js

```javascript
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      filename: 'index.html'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
};
```

运行 `webpack-dev-server`.

```bash
$ webpack-dev-server
```

现在你不再需要去手写`index.html` 和不用自己手动去打开浏览器. Webpack都帮你做了.

## Demo09: Environment flags 

通过环境变量,你能够使用某些代码在开发环境下.

main.js

```javascript
document.write('<h1>Hello World</h1>');

if (__DEV__) {
  document.write(new Date());
}
```

index.html

```html
<html>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

webpack.config.js

```javascript
var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [devFlagPlugin]
};
```

Now pass environment variable into webpack.

```bash
# Linux & Mac
$ env DEBUG=true webpack-dev-server

# Windows
$ set DEBUG=true
$ webpack-dev-server
```


