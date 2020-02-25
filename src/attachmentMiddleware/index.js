import { concatMiddleware } from 'botframework-webchat';

import wowAttachmentMiddleware from './wowAttachmentMiddleware';

export { wowAttachmentMiddleware };

export default concatMiddleware(wowAttachmentMiddleware);
