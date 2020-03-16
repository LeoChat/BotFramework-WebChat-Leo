import ReactWebChat, { concatMiddleware } from 'botframework-webchat';
import classNames from 'classnames';
import { css } from 'glamor';
import merge from 'merge';
import React, { useMemo } from 'react';

import defaultActivityMiddleware from './activityMiddleware';
import defaultAttachmentMiddleware from './attachmentMiddleware';
import defaultLocales from './locales';
import { createStyleSet } from './styleSet';
import { determineDirection } from './utils';

const ROOT_CSS = css({
  height: '100%',
  margin: '0 auto',
  maxWidth: 450,
  backgroundColor: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  webkitFontSmoothing: 'antialiased',
  mozOsxFontSmoothing: 'grayscale',

  '& *': {
    outline: 'none !important',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0) !important'
  },

  '& *:focus': {
    boxShadow: 'none !important'
  },

  /* width */
  '& > div > div::-webkit-scrollbar': {
    width: 8
  },

  /* Track */
  '& > div > div::-webkit-scrollbar-track': {
    borderRadius: 10,
    backgroundColor: 'rgba(180, 187, 205, 0.2)'
  },

  /* Handle */
  '& > div > div::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(180, 187, 205, 0.8)',
    border: '1px solid rgba(120, 120, 120, .1)',
    borderRadius: 10
  },

  /* Handle on hover */
  '& > div > div::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(180, 187, 205, 1)'
  },
});

const HEADER_CSS = css({
  boxSizing: 'content-box',
  backgroundColor: 'var(--header-bg)',
  color: '#efefef',
  fontWeight: '500',
  letterSpacing: '0.5px',
  padding: '4px',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '& > img': {
    width: '50px',
    height: '50px',
    margin: '5px',
    borderRadius: '100%',
    background: 'white',
    objectFit: 'contain',
  },

  '& > div': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'var(--text-align)',

    '& > p:first-child': {
      margin: 0,
      padding: '0 4px',
      fontWeight: 'bold',
      fontSize: '1em',
    },

    '& > p:last-child': {
      margin: 0,
      padding: '0 4px',
      fontWeight: 'bold',
      fontSize: '.8em',
    },
  },
});

const ReactLeoWebChat = ({
  headerLogo,
  headerTitle,
  headerSubtitle,
  ...props
}) => {
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

  const direction = useMemo(() => {
    return determineDirection(props.dir, props.language);
  }, [props.dir, props.language]);

  const headerVars = useMemo(() => {
    return {
      '--header-bg': styleSet.options.accent,
      '--text-align': direction === 'rtl' ? 'right' : 'left',
    };
  }, [styleSet.options, direction]);

  return (
    <div className={ROOT_CSS + ''}>
      <div style={headerVars} className={HEADER_CSS + ''}>
        {headerLogo && <img src={headerLogo} alt='' />}
        <div>
          {headerTitle && <p>{headerTitle}</p>}
          {headerSubtitle && <p>{headerSubtitle}</p>}
        </div>
      </div>

      <ReactWebChat
        {...props}
        activityMiddleware={activityMiddleware}
        attachmentMiddleware={attachmentMiddleware}
        styleOptions={styleSet.options}
        styleSet={styleSet}
        overrideLocalizedStrings={locales}
      />
    </div>
  );
};

export default ReactLeoWebChat;
