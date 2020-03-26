export * from './browserUtils';
export * from './hooksUtils';
export * from './localeUtils';
export * from './middlewareUtils';

export const noop = () => {};
export const plain = {};

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
