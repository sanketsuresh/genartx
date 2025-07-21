module.exports = {
  // ...existing code...
  devServer: {
    // ...existing code...
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Add your custom middlewares here
      // Example:
      // devServer.app.use((req, res, next) => {
      //   console.log('Custom middleware');
      //   next();
      // });

      return middlewares;
    },
    // ...existing code...
  },
  // ...existing code...
};
