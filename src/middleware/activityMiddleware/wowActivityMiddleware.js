import React from 'react';

import WowLayout from '../../components/layoutComponents/WowLayout';
import { leoAttachmentLayout } from '../../utils';

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
