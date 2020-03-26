import { createStore as superCreateStore } from 'botframework-webchat-core';

import { incomingActivity } from './actions';

export const createStore = (initialState, ...middlewares) => {
  return superCreateStore(initialState, ...middlewares);
};

export const bindDispatchersToEl = (store, el) => {
  el.dispatchIncomingActivity = (activity) => {
    store.dispatch(incomingActivity(activity))
  };

  return () => {
    delete el.dispatchIncomingActivity;
  };
};
