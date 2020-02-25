import { concatMiddleware } from 'botframework-webchat';

import wowActivityMiddleware from './wowActivityMiddleware';

export { wowActivityMiddleware };

export default concatMiddleware(wowActivityMiddleware);
