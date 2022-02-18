const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    const onError = function (err, req, res) {
        console.log('Something went wrong.', err);
        console.log('And we are reporting a custom error message.');
    };
    const socketProxy= createProxyMiddleware('/Sweepstakes.Web.Api', {
        target: 'http://3.211.184.6',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug',
        onError: onError 
    });

    const socketProxyD= createProxyMiddleware('/Sweepstakes.Web', {
        target: 'http://3.211.184.6',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug',
        onError: onError 
    });

    app.use(socketProxyD);
    app.use(socketProxy);
};