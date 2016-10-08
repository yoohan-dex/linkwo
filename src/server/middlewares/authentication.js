import logger from 'debug';
import {checkAuthorized} from '../graphql/controllers/authorization';

export default (req, res, next) => {
  checkAuthorized(req.token).then(auth => {
    if (auth) {
      logger('server:authorized')(auth._id);
      req.user = auth.email;
    } else {
      req.user = null;
    }
    next();
  }).catch(error => {
    logger('server:error')(error);
    if (req.headers['user-agent'].includes('node-fetch')) {
      req.user = null;
      next();
    } else {
      return res.status(401).send(error);
    }
  });
};
