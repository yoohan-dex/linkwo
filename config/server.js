const path = require('path');

export default {
  http: {
    port: 2333,
    favicon: path.join(__dirname, '../src/assets/favicon.ico'),
    static: [
      {
        url: '/build', path: path.join(__dirname, '../build'),
      },
    ],
  },
  salt: 'SUPER_SALTY_YES?',
  session: {
    secret: 'SUPER_SECRET_KEY_KERE',
    expires: 14 * 24 * 3600 * 1000, // 2 weeks
  },
  databases: {
    mongo: 'mongodb://127.0.0.1:27017/linkwo',
  },
};
