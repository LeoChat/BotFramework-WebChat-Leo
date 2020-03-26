import React from 'react';

import WowAttachment from '../../components/attachmentComponents/WowAttachment';
import { leoContentType } from '../../utils';

const wowAttachmentMiddleware = () => next => {
  const Attachment = ({ activity, attachment }) => {
    if (attachment.contentType === leoContentType('wow')) {
      return (
        <WowAttachment activity={activity} attachment={attachment} />
      );
    }

    return next({ activity, attachment });
  };

  return Attachment;
};

export default wowAttachmentMiddleware;
