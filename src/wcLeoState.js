import React, { createContext, useContext, useMemo } from 'react';

import { pick } from './utils';

const WCLeoContext = createContext();

const stateKeys = [
  'sendBoxRef'
];

export const WCLeoStateProvider = ({ children, ...props }) => {
  const candiState = pick(props, stateKeys);
  const state = useMemo(() => candiState, Object.values(candiState));

  return (
    <WCLeoContext.Provider value={state}>
      {children}
    </WCLeoContext.Provider>
  );
};

export const useSendBoxRef = () => {
  const { sendBoxRef } = useContext(WCLeoContext);

  return [sendBoxRef];
};
