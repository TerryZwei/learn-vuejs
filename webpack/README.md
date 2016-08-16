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

## Demo10: Code splitting 

对于大型web应用把所有的代码打包到一个文件里是很没效率的一件事, Webpack允许你把它们分割到几个块去. 特别地，如果在某些情况下某些代码块被引用，这些代码是可以按需加载的.

首先，你使用 `require.ensure` 去定义一个分割点. ([official document](http://webpack.github.io/docs/code-splitting.html))

```javascript
// main.js
require.ensure(['./a'], function(require) {
  var content = require('./a');
  document.open();
  document.write('<h1>' + content + '</h1>');
  document.close();
});
```

`require.ensure` 告诉 Webpack `./a.js` 应该从should be separated from `bundle.js` 分离出来并且单独构建到一个文件里面.

```javascript
// a.js
module.exports = 'Hello World';
```

现在Webpack关心它的依赖, 输出文件和运行时的东西. 你不必把任何冗余的东西打包到你的 `index.html` 和 `webpack.config.js`.

```html
<html>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

启动应用.

```bash
$ webpack-dev-server
```

表面上，你是感受不到任何变化的. 然而, 事实上Webpack分别把 `main.js` 和 `a.js` 构建到不同的文件里(`bundle.js` 和 `1.bundle.js`), 需要的时候从 `bundle.js` 加载 `1.bundle.js`.

## Demo11: Code splitting with bundle-loader

其他方式分割代码是可以使用 [bundle-loader](https://www.npmjs.com/package/bundle-loader).

```javascript
// main.js

// Now a.js is requested, it will be bundled into another file
var load = require('bundle-loader!./a.js');

// To wait until a.js is available (and get the exports)
//  you need to async wait for it.
load(function(file) {
  document.open();
  document.write('<h1>' + file + '</h1>');
  document.close();
});
```

`require('bundle-loader!./a.js')` 告诉Webpack从其他文件加载 `a.js`文件.

Webpack 将会把 `main.js` 构建到 `bundle.js`, 和把 `a.js` 构建到 `1.bundle.js`.

## Demo12: Common chunk

当多个脚本拥有公共的代码块时，你能通过使用CommonsChunkPlugin插件把公共的代码块提取离到单独的文件里面去.

```javascript
// main1.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('a')
);

// main2.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h2>Hello Webpack</h2>,
  document.getElementById('b')
);
```

index.html

```html
<html>
  <body>
    <div id="a"></div>
    <div id="b"></div>
    <script src="init.js"></script>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: {
    bundle1: './main1.jsx',
    bundle2: './main2.jsx'
  },
  output: {
    filename: '[name].js'
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
    ]
  },
  plugins: [
    new CommonsChunkPlugin('init.js')
  ]
}
```

## Demo13: Vendor chunk

通过使用CommonsChunkPlugin插件也能够提取公共引用库到一个分离文件里面.

main.js

```javascript
var $ = require('jquery');
$('h1').text('Hello World');
```

index.html

```html
<html>
  <body>
    <h1></h1>
    <script src="vendor.js"></script>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './main.js',
    vendor: ['jquery'],
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js')
  ]
};
```

如果你想一个模块作为一个变量在每一个模块里面都可用,譬如使用 $ 和 jQuery 在每一个模块里面都可用而不是通过 `require("jquery")`的形式.你应该使用 `ProvidePlugin` ([Official doc](http://webpack.github.io/docs/shimming-modules.html)).

```javascript
// main.js
$('h1').text('Hello World');


// webpack.config.js
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './main.js'
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};
```
## Demo14: Exposing global variables 

如果你想使用某些全局变量, 又不想在Webpack包含它们，你应该在 `webpack.config.js` ([official document](http://webpack.github.io/docs/library-and-externals.html)) 启用 `externals` 属性.

For example, we have a `data.js`.

```javascript
var data = 'Hello World';
```

We can expose `data` as a global variable.

```javascript
// webpack.config.js
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
    ]
  },
  externals: {
    // require('data') is external and available
    //  on the global var data
    'data': 'data'
  }
};
```

现在,你可以在你的脚本里引用 `data` 作为一个模块变量. 但是事实上它已经是一个全局变量了.

```javascript
// main.jsx
var data = require('data');
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>{data}</h1>,
  document.body
);
```

## Demo15: Hot Module Replacement 

[Hot Module Replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) (HMR)热加载模块修改、添加或者是删除模块时候，应用都是自动加载的 **而不是通过手动刷新**.

你可以使用下面这[两种方式](http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement) 启用热加载模块.

(1) Specify `--hot` and `--inline` on the command line

```bash
$ webpack-dev-server --hot --inline
```

Meaning of the options:

- `--hot`: 添加HotModuleReplacementPlugin插件和把服务转换到热加载模式.
- `--inline`: 把webpack-dev-server运行时嵌入到执行文件里.
- `--hot --inline`: 添加webpack/hot/dev-server 入口.

(2) Modify `webpack.config.js`.

- 添加 `new webpack.HotModuleReplacementPlugin()` 到 `plugins` 这个属性里
- 添加 `webpack/hot/dev-server` 和 `webpack-dev-server/client?http://localhost:8080` 到 `entry` 这个属性下

`webpack.config.js` looks like the following.

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      },
      include: path.join(__dirname, '.')
    }]
  }
};
```

启动服务.

```bash
$ webpack-dev-server
```

浏览 http://localhost:8080, 你能在浏览器上看到 'Hello World' .

不要关闭服务.打开终端编辑 `App.js`, 修改 'Hello World' 为 'Hello Webpack'. 保存, 并观察浏览器上面的变化.

App.js

```javascript
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}
```

index.js

```javascript
import React from 'react';
import ReactDOM = require('react-dom');
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

index.html

```html
<html>
  <body>
    <div id='root'></div>
    <script src="/static/bundle.js"></script>
  </body>
</html>
```