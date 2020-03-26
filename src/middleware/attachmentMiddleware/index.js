import { concatMiddleware } from 'botframework-webchat';

import leoAdaptiveCardAttachmentMiddleware from './leoAdaptiveCardAttachmentMiddleware';
import wowAttachmentMiddleware from './wowAttachmentMiddleware';

export {
  leoAdaptiveCardAttachmentMiddleware,
  wowAttachmentMiddleware,
};

// ORDER MATTERS!
export default concatMiddleware(
  wowAttachmentMiddleware,
  leoAdaptiveCardAttachmentMiddleware,
);
