import { hooks as WebChatHooks } from 'botframework-webchat';
import React from 'react';

const { useStyleSet } = WebChatHooks;

const leoAdaptiveCardAttachmentMiddleware = () => next => {
  const Attachment = ({ activity, attachment }) => {
    const [{ leoAdaptiveCardAttachment: adaptiveCardStyleSet }] = useStyleSet();
    const children = next({ activity, attachment });

    // This will apply style fixes to existing adaptive card implementation
    if (/^application\/vnd\.microsoft\.card/.test(attachment.contentType)) {
      return (
        <span className={adaptiveCardStyleSet + ''}>
          {children}
        </span>
      );
    }

    return children;
  };

  return Attachment;
};

export default leoAdaptiveCardAttachmentMiddleware;
