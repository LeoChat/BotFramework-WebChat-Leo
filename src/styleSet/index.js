import { createStyleSet as createDefaultStyleSet } from 'botframework-webchat';

import { createLeoAdaptiveCardAttachmentStyleSet } from './leoAdaptiveCardAttachment';
import { createRootStyleSet } from './rootStyleSet';
import { createWowStyleSet } from './wowStyleSet';

export const createStyleSet = (styleOptions) => {
  // Merged options will be stored in defaultStyleSet.options
  const defaultStyleSet = createDefaultStyleSet({
    bubbleBackground: '#f2f2f2',
    bubbleBorderRadius: 20,
    bubbleTextColor: '#141414',
    bubbleFromUserBackground: '#000000',
    bubbleFromUserTextColor: '#ffffff',
    bubbleFromUserBorderRadius: 20,
    sendBoxButtonColorOnHover: '#414141',
    sendBoxButtonColorOnFocus: '#414141',
    paddingRegular: 10,
    avatarSize: 35,
    suggestedActionBorderRadius: 20,
    ...(styleOptions || {}),
  });

  return {
    ...defaultStyleSet,
    ...createLeoAdaptiveCardAttachmentStyleSet(defaultStyleSet.options),
    ...createRootStyleSet(defaultStyleSet.options),
    ...createWowStyleSet(defaultStyleSet.options),
  };
};
