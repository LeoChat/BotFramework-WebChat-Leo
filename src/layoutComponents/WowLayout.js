import classNames from 'classnames';
import { css } from 'glamor';
import React from 'react';

import {
  Components as WebChatComponents,
  hooks as WebChatHooks
} from 'botframework-webchat';

const { Avatar, Bubble } = WebChatComponents;
const {
  useAvatarForBot,
  useAvatarForUser,
  useDirection,
  useRenderActivityStatus,
  useStyleOptions,
  useStyleSet,
} = WebChatHooks;

const ROOT_CSS = css({
  display: 'flex',
  MsOverflowStyle: 'none',
  overflowX: 'scroll',
  overflowY: 'hidden',
  touchAction: 'manipulation',
  WebkitOverflowScrolling: 'touch',

  '&::-webkit-scrollbar': {
    display: 'none'
  },

  '& > .avatar': {
    flexShrink: 0
  },

  '& > .content': {
    flex: 1,

    '& > ul': {
      display: 'flex',
      listStyleType: 'none',
      margin: 0,
      padding: 0,

      '& > li': {
        flex: 1
      }
    }
  }
});

const WowLayout = ({ activity, nextVisibleActivity, renderAttachment }) => {
  const [{ initials: botInitials }] = useAvatarForBot();
  const [{ initials: userInitials }] = useAvatarForUser();
  const [{ botAvatarInitials, bubbleNubSize, bubbleFromUserNubSize, userAvatarInitials }] = useStyleOptions();
  const [{ leoWowLayout: wowActivityStyleSet }] = useStyleSet();
  const [direction] = useDirection();
  const renderActivityStatus = useRenderActivityStatus({ activity, nextVisibleActivity });

  const {
    attachments = [],
    from: { role } = {},
  } = activity;

  const fromUser = role === 'user';
  const initials = fromUser ? userInitials : botInitials;
  const indented = fromUser ? bubbleFromUserNubSize : bubbleNubSize;

  /*
    This is how the localizer can be used:

      const localize = useLocalizer();
      const roleLabel = localize(fromUser ? 'WOW_ATTACHMENTS_USER_ALT' : 'WOW_ATTACHMENTS_BOT_ALT');
  */

  return (
    <div
      className={classNames(
        ROOT_CSS + '',
        wowActivityStyleSet + '',
        direction === 'rtl' ? 'webchatleo__wow--rtl' : '',
        {
          'from-user': fromUser,
          webchatleo__wow_extra_left_indent:
            (direction !== 'rtl' && fromUser && !botAvatarInitials && bubbleNubSize) ||
            (direction === 'rtl' && !fromUser && !userAvatarInitials && bubbleFromUserNubSize),
          webchatleo__wow_extra_right_indent:
            (direction !== 'rtl' && !fromUser && !userAvatarInitials && bubbleFromUserNubSize) ||
            (direction === 'rtl' && fromUser && !botAvatarInitials && bubbleNubSize),
          webchatleo__wow_indented_content: initials && !indented
        }
      )}
    >
      {!initials && !!(fromUser ? bubbleFromUserNubSize : bubbleNubSize) && <div className="avatar" />}
      <Avatar className="avatar" fromUser={fromUser} />
      <div className="content">
        <ul className={classNames({ webchatleo__wow__item_indented: indented })}>
          {attachments.map((attachment, index) => (
            <li key={index}>
              <Bubble fromUser={fromUser} key={index} nub={false}>
                {renderAttachment({ attachment })}
              </Bubble>
            </li>
          ))}
        </ul>
        <div className={classNames('webchat__row', { webchatleo__wow_item_indented: indented })}>
          {renderActivityStatus()}
        </div>
      </div>
    </div>
  );
};

export default WowLayout;
