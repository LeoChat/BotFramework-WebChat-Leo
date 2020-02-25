const namespace = 'vnd.leo';

export const leoAttachmentLayout = (layout) => {
  return `${namespace}.${layout}`;
};

export const leoContentType = (type) => {
  return `application/${namespace}.${type}`;
};
