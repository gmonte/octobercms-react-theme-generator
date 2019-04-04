/* eslint-disable */
const autoprefixer = require('autoprefixer')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )
const CreateFileWebpack = require('create-file-webpack')
const tail = require('lodash/tail')
const fs = require('fs')
const pkgJson = require('../package.json')
const {
  themeName,
  layoutHtmOptions,
  layoutHtmHeader,
  pageHtmOptions
} = require('./october.config')

const createThemeYaml = () =>
  `name: ${ themeName }
version: ${ pkgJson.version }
description: '${ pkgJson.description }'
author: Guilherme Monte
homepage: 'https://github.com/gmonte/october-react-theme-generator'
`

const createLayoutDefault = () =>
  `title = "Index"
url = "/"
layout = "default"
is_hidden = 0
${ layoutHtmOptions }
==`

const createPageDefault = () =>
  `title = "Index"
url = "/"
layout = "default"
is_hidden = 0
${ pageHtmOptions }
==`

const modifyLayoutHtm = () => {
  return new Promise((resolve, reject) => {
    try {
      const favicon = `<link rel="shortcut icon" href="{{ 'assets/favicon.ico'|theme }}">`

      const file = path.resolve(__dirname, `../dist/${ themeName }/layouts/default.htm`)
      let fileContent = fs.readFileSync(file, 'utf8')
      fileContent = fileContent
        .split('</head>')
        .join(`${ layoutHtmHeader }${ favicon }</head>`)

      writeFile(file, `
${ createLayoutDefault() }
${ fileContent }`)

      copyFile(
        path.resolve(__dirname, '../public/favicon.ico'),
        path.resolve(__dirname, `../dist/${ themeName }/assets/favicon.ico`)
      )

      resolve()
    }
    catch (e) {
      reject(e)
    }
  })
}

const writeFile = (file, fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, fileContent, err => (err ? reject(err) : resolve()))
  });
}

const copyFile = (from, to) => {
  return new Promise((resolve, reject) => {
    fs.copyFile(from, to, err => (err ? reject(err) : resolve()))
  });
}

module.exports = (env, argv) => ({
  entry: {
    main: path.resolve(__dirname, `../src/index.js`),
  },
  output: {
    path: path.resolve(__dirname, `../dist/${ themeName }`),
    filename: 'assets/[name].js',
    chunkFilename: `assets/[name].js`,
    publicPath: `themes/${ themeName }/`
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    symlinks: false
  },
  watchOptions: {
    poll: true
  },
  devServer: {
    noInfo: false,
    port: 3000,
    open: true
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `../.env.${ argv.mode }`),
      systemvars: true
    }),
    new SimpleProgressWebpackPlugin({
      format: 'compact'
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'layouts/default.htm'
    }),
    new CreateFileWebpack({
      // path to folder in which the file will be created
      path: path.resolve(__dirname, `../dist/${ themeName }`),
      // file name
      fileName: 'theme.yaml',
      // content of the file
      content: createThemeYaml()
    }),
    new CreateFileWebpack({
      // path to folder in which the file will be created
      path: path.resolve(__dirname, `../dist/${ themeName }/pages`),
      // file name
      fileName: 'default.htm',
      // content of the file
      content: createPageDefault()
    }),
    {
      apply: compiler => compiler.hooks.afterEmit.tap('AfterEmitPlugin', modifyLayoutHtm)
    }
  ],
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'assets/static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            rootMode: 'upward'
          }
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      }
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      chunks: 'all',
    }
  }
})

