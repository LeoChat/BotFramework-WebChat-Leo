import { createStyleSet as createDefaultStyleSet } from 'botframework-webchat';

import { createWowStyleSet } from './wowStyleSet';

export const createStyleSet = (styleOptions) => {
  const defaultStyleSet = createDefaultStyleSet(styleOptions);

  return {
    ...defaultStyleSet,
    ...createWowStyleSet(defaultStyleSet.options),
  };
};
