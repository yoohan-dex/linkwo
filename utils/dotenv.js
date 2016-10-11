export default () => {
  const dotenv = require('dotenv');
  const dotenvExpand = require('dotenv-expand');
  const myEnv = dotenv.config({silent: true});
  dotenvExpand(myEnv);

  return true;
};
