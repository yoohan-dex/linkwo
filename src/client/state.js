import {observable, asFlat, toJS} from 'mobx';
import mergeObservables from './helpers/mergeObservables';

export const defaultState = observable({
  app: {
    title: 'LinkWo->',
    statusCode: 200,
    hostname: 'localhost',
  },
});

export const createServerState = () => toJS(defaultState);
export const createClientState = () => mergeObservables(defaultState, window.__STATE);
