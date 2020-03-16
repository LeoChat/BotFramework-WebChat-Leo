import { hooks as WebChatHooks } from 'botframework-webchat';
import classNames from 'classnames';
import { css } from 'glamor';
import React, { useCallback } from 'react';

const { usePostActivity, useStyleSet } = WebChatHooks;

const ROOT_CSS = css({
  width: 50,
  height: 50,
  borderRadius: 999,
  textAlign: 'center',
  color: 'white',
});

const WowAttachment = ({ attachment }) => {
  const { key, text } = attachment.content;
  const [{ leoWowAttachment: wowAttachmentStyleSet }] = useStyleSet();
  const postActivity = usePostActivity();

  const postWowActivity = useCallback(() => {
    return postActivity({
      type: 'message',
      value: key,
    });
  }, [key, postActivity]);

  return (
    <div onClick={postWowActivity} className={classNames(
      ROOT_CSS + '',
      wowAttachmentStyleSet + ''
    )}>
      <p>
        {text.trim()}
      </p>
    </div>
  );
};

export default WowAttachment;
