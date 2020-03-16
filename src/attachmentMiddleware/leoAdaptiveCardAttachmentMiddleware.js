import { hooks as WebChatHooks } from 'botframework-webchat';
import React, { useMemo } from 'react';

const { useDirection, useStyleSet } = WebChatHooks;

const leoAdaptiveCardAttachmentMiddleware = () => next => {
  const Attachment = ({ activity, attachment }) => {
    const [direction] = useDirection();
    const [{ leoAdaptiveCardAttachment: adaptiveCardStyleSet }] = useStyleSet();
    const children = next({ activity, attachment });

    const directionVars = useMemo(() => {
      // This will dynamically affect CSS while remaining it static
      return {
        '--ac-left': `${direction === 'rtl' : 'right !important' ? 'left'}`,
        '--ac-right': `${direction === 'rtl' : 'left !important' ? 'right'}`,
      };
    }, [direction]);

    // This will apply style fixes to existing adaptive card implementation
    if (/^application\/vnd\.microsoft\.card/.test(attachment.contentType)) {
      return (
        <span style={directionVars} className={adaptiveCardStyleSet + ''}>
          {children}
        </span>
      );
    }

    return children;
  };

  return Attachment;
};

export default leoAdaptiveCardAttachmentMiddleware;
