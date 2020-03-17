import React from 'react';

import { leoAttachmentLayout } from '../utils';
import WowLayout from '../layoutComponents/WowLayout';

const wowActivityMiddleware = () => next => ({ activity, nextVisibleActivity }) => {
  if (
    activity.type === 'message' &&
    activity.attachments?.length >= 1 &&
    activity.attachmentLayout === leoAttachmentLayout('wow')
  ) {
    const BoundWowLayout = renderAttachment => (
      <WowLayout activity={activity} nextVisibleActivity={nextVisibleActivity} renderAttachment={renderAttachment} />
    );

    return BoundWowLayout;
  }

  return next({ activity, nextVisibleActivity });
};

export default wowActivityMiddleware;
