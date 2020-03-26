import { createStore } from 'botframework-webchat';

import * as actions from './actions';
import { upperFirst } from './utils';

export { createStore };

export const getLeoDispatchers = (store) => {
  return Object.keys(actions).reduce((dispatchers, actionName) => {
    const dispatcherName = `dispatch${upperFirst(actionName)}`;
    const action = actions[actionName];

    dispatchers[dispatcherName] = (...args) => {
      return store.dispatch(action(...args));
    };

    return dispatchers;
  }, {});
};
