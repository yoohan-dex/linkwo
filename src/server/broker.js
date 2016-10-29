import logger from 'debug';
module.exports.run = function () {
  logger('   >> Broker PID:', process.pid);
};
