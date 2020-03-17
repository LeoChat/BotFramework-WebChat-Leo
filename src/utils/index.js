export * from './middlewareUtils';
export const browser = require('./browserUtils');

export const noop = () => {};

export const getRTLList = () => {
  const rtlList = ['ar-EG', 'ar-JO', 'ar-SA', 'he-IL'];

  return rtlList;
};

export const determineDirection = (dir, language) => {
  if (dir !== 'auto') {
    return dir;
  }
  else if (getRTLList().includes(language)) {
    return 'rtl';
  }

  return 'ltr';
};
