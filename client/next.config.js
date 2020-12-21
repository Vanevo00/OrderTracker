const config = require('config')
const graphQLEndpoint = `${config.get('graphql.domain')}/${config.get('graphql.endpoint')}`
const webpack = require('webpack')
const withCSS = require('@zeit/next-css')

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        GRAPHQL_ENDPOINT: JSON.stringify(graphQLEndpoint)
      })
    )
    return config
  },
  cssLoaderOptions: {
    url: false
  }
}

module.exports = withCSS(nextConfig)
