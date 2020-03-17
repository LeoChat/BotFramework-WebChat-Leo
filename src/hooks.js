import { useEffect, useRef, useState } from 'react';

import { browser } from './utils';

export const useCSSVarsPolyfill = () => {
  const isMountedRef = useRef(true);
  const [error, setError] = useState(null);

  const [loaded, setLoaded] = useState(() => {
    if (!browser.ie11) return true;

    const testEl = document.createElement('i');
    testEl.style.setProperty('--x', 'y');
    if (testEl.style.getPropertyValue('--x') === 'y' || !testEl.msMatchesSelector) return true;

    const scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.src = 'https://raw.githubusercontent.com/nuxodin/ie11CustomProperties/26343ce21360dd6ca250bddf8569dc12b8e2f04d/ie11CustomProperties.js';

    scriptEl.onload = () => {
      if (isMountedRef.current) {
        setLoaded(true);
      }
    };

    scriptEl.onerror = (error) => {
      setError(error);
    };

    document.head.appendChild(scriptEl);

    return false;
  }, [true]);

  useEffect(() => () => {
    isMountedRef.current = false;
  }, [true]);

  return [loaded, error];
};
