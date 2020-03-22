import ReactWebChat, { concatMiddleware } from 'botframework-webchat';
import classNames from 'classnames';
import { css } from 'glamor';
import merge from 'merge';
import React, { useLayoutEffect, useMemo, useRef } from 'react';

import defaultActivityMiddleware from './activityMiddleware';
import defaultAttachmentMiddleware from './attachmentMiddleware';
import { useCSSVarsPolyfill } from './hooks';
import defaultLocales from './locales';
import { createStyleSet } from './styleSet';
import { determineDirection } from './utils';

const ROOT_CSS = css({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 450,
  margin: '0 auto',
  backgroundColor: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',

  '& *': {
    outline: 'none !important',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0) !important'
  },

  '& *:focus': {
    boxShadow: 'none !important'
  },

  '& > div:last-child': {
    flex: 1,
    overflowY: 'hidden',

    /* width */
    '& > div > div > div::-webkit-scrollbar': {
      width: 8
    },

    /* Track */
    '& > div > div > div::-webkit-scrollbar-track': {
      borderRadius: 10,
      backgroundColor: 'rgba(180, 187, 205, 0.2)'
    },

    /* Handle */
    '& > div > div > div::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(180, 187, 205, 0.8)',
      border: '1px solid rgba(120, 120, 120, .1)',
      borderRadius: 10
    },

    /* Handle on hover */
    '& > div > div > div::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(180, 187, 205, 1)'
    },
  },
});

const HEADER_CSS = css({
  boxSizing: 'content-box',
  color: '#efefef',
  fontWeight: '500',
  letterSpacing: '0.5px',
  padding: '4px',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // backgroundColor: 'var(--header-bg)',

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
    // textAlign: 'var(--text-align)',

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
  showHeader,
  headerLogo,
  headerTitle,
  headerSubtitle,
  ...props
}) => {
  const header = useRef({}).current;
  header.containerRef = useRef();
  header.contentsRef = useRef();

  const shouldShowHeader = useMemo(() => {
    return headerLogo && headerTitle && headerSubtitle;
  }, [headerLogo, headerTitle, headerSubtitle]);

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

  useLayoutEffect(() => {
    header.containerRef.current.style.backgroundColor = styleSet.options.accent;
    header.contentsRef.current.style.textAlign = direction === 'rtl' ? 'right' : 'left';
  }, [styleSet.options, direction]);

  return (
    <div className={ROOT_CSS + ''}>
      {shouldShowHeader && (
        <div ref={header.containerRef} className={HEADER_CSS + ''}>
          {headerLogo && <img src={headerLogo} alt='' />}
          <div ref={header.contentsRef}>
            {headerTitle && <p>{headerTitle}</p>}
            {headerSubtitle && <p>{headerSubtitle}</p>}
          </div>
        </div>
      )}

      <div>
        <ReactWebChat
          {...props}
          activityMiddleware={activityMiddleware}
          attachmentMiddleware={attachmentMiddleware}
          styleOptions={styleSet.options}
          styleSet={styleSet}
          overrideLocalizedStrings={locales}
        />
      </div>
    </div>
  );
};

export default ReactLeoWebChat;
