import React from 'react';

import { leoAttachmentLayout } from '../utils';
import WoWLayout from '../layoutComponents/WowLayout';

const wowActivityMiddleware = () => next => ({ activity, nextVisibleActivity }) => {
  if (
    activity.type === 'message' &&
    activity.attachments?.length >= 1 &&
    activity.attachmentLayout === leoAttachmentLayout('wow')
  ) {
    const BoundWoWLayout = renderAttachment => (
      <WoWLayout activity={activity} nextVisibleActivity={nextVisibleActivity} renderAttachment={renderAttachment} />
    );

    return BoundWoWLayout;
  }

  return next({ activity, nextVisibleActivity });
};

export default wowActivityMiddleware;
