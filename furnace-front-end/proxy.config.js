const proxy = [
    {
        context: '/api',
        target: 'http://localhost:2929',
        pathRewrite: { '^/api': '' }
    }
]; module.exports = proxy;