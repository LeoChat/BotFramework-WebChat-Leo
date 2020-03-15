import { concatMiddleware } from 'botframework-webchat';

import wowActivityMiddleware from './wowActivityMiddleware';

export { wowActivityMiddleware };

// ORDER MATTERS!
export default concatMiddleware(
  wowActivityMiddleware
);
