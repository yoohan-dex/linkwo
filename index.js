const sourceMaps = require('source-map-support');
sourceMaps.install();

require('./utils/polyfills');
require('./utils/console');

require('babel-register');
require('./src/server/index');
process.on('unhandleRejection', console.error.bind(console));

// if (process.env.NODE_ENV === 'production') {
//   require('./config/webpack.prod.js');
// } else {
//   process.env.DEV = true;
//   require('./config/webpack.dev.js');
// }
