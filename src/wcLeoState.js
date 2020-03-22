import React, { createContext, useContext, useMemo } from 'react';

const LeoContext = createContext();

export const WCLeoStateProvider = ({ children, ...props }) => {
  const candiState = Object.keys(props, [
    'sendBoxRef'
  ]);
  const state = useMemo(() => candiState, candiState);

  return (
    <LeoContext.Provider value={state}>
      {children}
    </LeoContext.Provider>
  );
};

export const useSendBoxRef = () => {
  const { sendBoxRef } = useContext(LeoContext);

  return [sendBoxRef];
};
