export * from './browserUtils';
export * from './hooksUtils';
export * from './middlewareUtils';

export const noop = () => {};
export const plain = {};

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

export const omit = (obj, keys) => {
  return keys.reduce((newObj, key) => {
    delete newObj[key];

    return newObj;
  }, { ...obj });
};

export const pick = (obj, keys) => {
  return keys.reduce((newObj, key) => {
    newObj[key] = obj[key];

    return newObj;
  }, {});
};
