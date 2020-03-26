/* This was taken directly from 'botframework-webchat-core/src/actions' */

export const INCOMING_ACTIVITY = 'DIRECT_LINE/INCOMING_ACTIVITY';

export const incomingActivity = (activity) => {
  return {
    type: INCOMING_ACTIVITY,
    payload: { activity }
  };
}
