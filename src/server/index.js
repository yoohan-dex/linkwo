// const sourceMaps = require('source-map-support');
// sourceMaps.install();
if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: false,
    ignore: /(\/\.|~$|\.json$)/i,
  })) {
    return;
  }
}
require('../../utils/polyfills');
require('../../utils/console');

require('babel-register');
require('./server');
process.on('unhandleRejection', console.error.bind(console));

