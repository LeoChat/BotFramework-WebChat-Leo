import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export const useConst = (value) => {
  return useRef(value).current;
};

export const useMountState = () => {
  const mountState = useRef(true);

  useEffect(() => {
    return () => {
      mountState.current = false;
    };
  }, [true]);

  return mountState;
};

const createAsyncEffectHook = (useEffect) => (fn, input) => {
  const cbQueueRef = useRef([]);
  const [result, setResult] = useState(null);
  const [iterator, setIterator] = useState(null);

  const cleanup = useCallback(() => {
    for (let callback of cbQueueRef.current) {
      callback();
    }
  }, [iterator]);

  const onCleanup = useCallback((fn) => {
    cbQueueRef.current.push(fn);
  }, [true]);

  const next = useCallback((value) => {
    if (result && result.done) {
      return;
    }

    setResult(iterator.next(value));
  }, [result, iterator]);

  const throwback = useCallback((error) => {
    if (result && result.done) {
      return;
    }

    setResult(iterator.throw(error));
  }, [result]);

  useEffect(() => {
    cbQueueRef.current = [];
    setResult(null);
    setIterator(() => fn(onCleanup));

    return cleanup;
  }, input);

  useEffect(() => {
    if (!iterator) return;

    next();
  }, [iterator]);

  useEffect(() => {
    if (!result) return;

    let mounted = true;

    if (result.value instanceof Promise) {
      result.value.then((value) => {
        if (mounted) {
          next(value);
        }
      }).catch((error) => {
        if (mounted) {
          throwback(error);
        }
      });

      return;
    }

    next(result.value);

    return () => {
      mounted = false;
    };
  }, [result]);
};
export const useAsyncEffect = createAsyncEffectHook(useEffect);
export const useAsyncLayoutEffect = createAsyncEffectHook(useLayoutEffect);

export const useAsyncCallback = (fn, input) => {
  const mountState = useMountState();

  return useCallback(async (...args) => {
    const iterator = fn(...args);
    let result = iterator.next();

    while (!result.done) {
      try {
        const result = await result.value;

        if (mountState.current) {
          result = iterator.next(result);
        }
      }
      catch (e) {
        if (mountState.current) {
          result = iterator.throw(e);
        }
      }
    }

    return result.value;
  }, input);
};
