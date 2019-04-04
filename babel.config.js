const isFunction = require('lodash/isFunction')

module.exports = (api) => {
  if (api && isFunction(api.cache)) {
    api.cache(true)
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          'shippedProposals': true,
          'modules': false,
          'targets': {
            'browsers': [
              'last 2 versions'
            ]
          }
        }
      ],
      '@babel/preset-react',
      '@babel/preset-flow'
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      ['@babel/plugin-proposal-class-properties', { 'loose': true }],
      [
        '@babel/plugin-transform-runtime',
        {
          'helpers': true,
          'regenerator': true
        }
      ]
    ]
  }
}
