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

// foo_barBaz -> ['foo', 'bar', 'Baz']
export const splitWords = (str) => {
  return str
    .replace(/[A-Z]/, ' $&')
    .split(/[^a-zA-Z0-9]+/)
    .filter(word => word.trim());
};

// upper -> Upper
export const upperFirst = (str) => {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
};

// camel_case -> camelCase
export const camelCase = (str) => {
  const words = splitWords(str);
  const first = words.shift().toLowerCase();
  const rest = words.map(upperFirst);

  return [first, ...rest].join('');
};
