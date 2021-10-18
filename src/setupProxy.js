const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://192.168.1.234:8545',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    }),
  )
}
