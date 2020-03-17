import { hooks as WebChatHooks } from 'botframework-webchat';
import React, { useCallback } from 'react';

const { useDirection, useStyleSet } = WebChatHooks;

const leoAdaptiveCardAttachmentMiddleware = () => next => {
  const Attachment = ({ activity, attachment }) => {
    const [direction] = useDirection();
    const [{ leoAdaptiveCardAttachment: adaptiveCardStyleSet }] = useStyleSet();
    const children = next({ activity, attachment });

    const setCardCSSVars = useCallback((el) => {
      if (!el) return;

      el.style.setProperty('--ac-left', direction === 'rtl' ? 'right !important' : 'left');
      el.style.setProperty('--ac-right', direction === 'rtl' ? 'left !important' : 'right');
    }, [direction]);

    // This will apply style fixes to existing adaptive card implementation
    if (/^application\/vnd\.microsoft\.card/.test(attachment.contentType)) {
      return (
        <span ref={setCardCSSVars} className={adaptiveCardStyleSet + ''}>
          {children}
        </span>
      );
    }

    return children;
  };

  return Attachment;
};

export default leoAdaptiveCardAttachmentMiddleware;
