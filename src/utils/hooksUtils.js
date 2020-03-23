import { useRef } from 'react';

export const useConst = (value) => {
  return useRef(value).current;
};
