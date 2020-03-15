import classNames from 'classnames';
import ReactWebChat, { concatMiddleware } from 'botframework-webchat';
import merge from 'merge';
import React, { useMemo } from 'react';

import defaultActivityMiddleware from './activityMiddleware';
import defaultAttachmentMiddleware from './attachmentMiddleware';
import defaultLocales from './locales';
import { createStyleSet } from './styleSet';

const ReactLeoWebChat = (props) => {
  const activityMiddleware = useMemo(() => {
    return concatMiddleware(...[props.activityMiddleware, defaultActivityMiddleware].filter(Boolean));
  }, [props.activityMiddleware]);

  const attachmentMiddleware = useMemo(() => {
    return concatMiddleware(...[props.attachmentMiddleware, defaultAttachmentMiddleware].filter(Boolean));
  }, [props.attachmentMiddleware]);

  const styleSet = useMemo(() => {
    return createStyleSet(props.styleOptions);
  }, [props.styleOptions]);

  const locales = useMemo(() => {
    return merge.recursive({}, defaultLocales, props.overrideLocalizedStrings);
  }, [props.overrideLocalizedStrings]);

  return (
    <ReactWebChat
      {...props}
      activityMiddleware={activityMiddleware}
      attachmentMiddleware={attachmentMiddleware}
      styleOptions={styleSet.options}
      styleSet={styleSet}
      overrideLocalizedStrings={locales}
    />
  );
};

export default ReactLeoWebChat;
