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

    import('ie11-custom-properties').then(() => {
      if (isMountedRef.current) {
        setLoaded(true);
      }
    })
    .catch((error) => {
      setError(error);
    });

    return false;
  }, [true]);

  useEffect(() => () => {
    isMountedRef.current = false;
  }, [true]);

  return [loaded, error];
};
