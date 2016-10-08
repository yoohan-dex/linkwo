import {createServerState} from '../../client/state';

export default function (req, res, next) {
  const state = createServerState();
  state.app.hostname = req.headers.host;

  req.context = {
    state,
  };
  next();
}
