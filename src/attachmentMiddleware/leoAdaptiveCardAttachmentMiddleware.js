import { hooks as WebChatHooks } from 'botframework-webchat';
import React, { useLayoutEffect, useRef } from 'react';

const { useDirection, useStyleSet } = WebChatHooks;

const leoAdaptiveCardAttachmentMiddleware = () => next => {
  const Attachment = ({ activity, attachment }) => {
    const cardRef = useRef(null);
    const [direction] = useDirection();
    const [{ leoAdaptiveCardAttachment: adaptiveCardStyleSet }] = useStyleSet();
    const children = next({ activity, attachment });

    useLayoutEffect(() => {
      if (!cardRef.current) return;

      cardRef.current.style.setProperty('--ac-left', direction === 'rtl' ? 'right !important' : 'left');
      cardRef.current.style.setProperty('--ac-right', direction === 'rtl' ? 'left !important' : 'right');
    }, [direction]);

    // This will apply style fixes to existing adaptive card implementation
    if (/^application\/vnd\.microsoft\.card/.test(attachment.contentType)) {
      return (
        <span ref={cardRef} className={adaptiveCardStyleSet + ''}>
          {children}
        </span>
      );
    }

    return children;
  };

  return Attachment;
};

export default leoAdaptiveCardAttachmentMiddleware;
