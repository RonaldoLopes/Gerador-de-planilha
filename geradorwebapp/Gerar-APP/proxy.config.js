const proxy = [
    {
      context: '/api',
      target: 'http://192.168.0.24:8095',
      pathRewrite: {'^/api' : ''}
    }
  ];module.exports = proxy;