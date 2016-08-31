// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var program = require('commander')

program
  .version('0.0.1')
  .option('-p, --project', 'Project')
  .option('-f, --folder', 'Folder')
  .parse(process.argv);
var project = program.args?program.args[0]: '';
var folder = program.args?program.args[1]: '';

module.exports = {
  build: {
    env: require('./prod.env'),
    projectName: project,
    folderName: folder,
    index: path.resolve(__dirname, '../../'+project+'/assets/js/dist/'+folder+'/index.html'),
    assetsRoot: path.resolve(__dirname, '../../'+project+'/assets/js/dist/'),
    assetsSubDirectory: folder+'/static',
    assetsPublicPath: '/js/dist/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    projectName: project,
    folderName: folder,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
