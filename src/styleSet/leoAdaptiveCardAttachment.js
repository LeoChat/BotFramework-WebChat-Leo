import { hooks as WebChatHooks } from 'botframework-webchat';

const { useDirection } = WebChatHooks;

export const createLeoAdaptiveCardAttachmentStyleSet = ({ accent }) => {
  const cache = {};

  return {
    get leoAdaptiveCardAttachment() {
      const direction = useDirection();

      if (cache.direction === direction) return cache.result;

      const result = {
        /* Adaptive card */

        // Functionality is mostly related to disabling buttons once the card is not
        // in the front anymore
        '& .webchat__row.attachment': {
          backgroundColor: 'inherit',

          '& .attachment.bubble': {
            backgroundColor: 'rgb(255, 255, 255)'
          },

          '& p': {
            textAlign: direction === 'ltr' ? 'left' : 'right !important'
          },

          '& button:disabled': {
            backgroundColor: '#ccc',
            color: '#888',
            border: '1px solid #ccc',
          },

          '& button': {
            backgroundColor: 'white',
            color: accent,
            width: 'auto',
            fontSize: 16,
            cursor: 'pointer',
            padding: '12px 6px',
            borderRadius: 20,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
            border: '1px solid ' + accent,
            textAlign: 'center',
            lineHeight: 1,
            transition: 'all 0.3s ease-in-out'
          },

          '& button:hover:not([disabled]), & button:active': {
            backgroundColor: accent,
            color: 'White',
            boxShadow: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.16)',
          },

          '& button:focus': {
            outline: 'none'
          },

          '& .receipt table': {
            borderCollapse: 'collapse',
            width: '100%'
          },

          '& .receipt th, & .receipt td': {
            textAlign: direction === 'ltr' ? 'left' : 'right !important',
            verticalAlign: 'top'
          },

          '& .receipt th:first-child, & .receipt td:first-child': {
            textAlign: direction === 'ltr' ? 'right' : 'left !important'
          },

          '& .receipt th': {
            color: '#444',
            fontSize: 'inherit',
            fontWeight: 'normal',
            lineHeight: 1.75
          },

          '& .receipt thead tr:last-child th': {
            paddingBottom: 16
          },

          '& .receipt th[colspan="2"]': {
            color: 'inherit',
            fontSize: 15,
            fontWeight: 700
          },

          '& .receipt td': {
            padding: '4px 8px 0 8px'
          },

          '& .receipt td img': {
            float: direction === 'ltr' ? 'right' : 'left !important',
            margin: '5px 8px 8px 0',
            maxHeight: 50,
            maxWidth: 50
          },

          '& .receipt div.title': {
            fontWeight: 'bolder'
          },

          '& .receipt div.subtitle': {
            fontWeight: 'lighter'
          },

          '& .receipt tbody tr, & .receipt tfoot tr': {
            borderTop: '1px solid #ccc'
          },

          '& .receipt tbody tr:first-child, & .receipt tfoot tr:first-child': {
            borderTopWidth: 2
          },

          '& .receipt tfoot td': {
            lineHeight: 2.25
          },

          '& .receipt tfoot .total': {
            fontWeight: 'bold'
          },

          '& .thumbnail img': {
            float: direction === 'ltr' ? 'left' : 'right !important',
            marginBottom: 10,
            marginLeft: 10,
            width: 100
          },

          '& .signin h1': {
            margin: '10px 24px 16px 14px'
          },

          '& input[type=number], & input[type=text], & input[type=tel], & input[type=password], & input[type=email], & input[type=date], & input[type=time], & textarea': {
            border: '1px solid #b5b5b5',
            borderRadius: 5,
            boxShadow: 'inset 1px 1px 1px 0 rgba(198, 198, 198, 0.31)',
            color: '#444',
            background: '#fff',
            outline: 'none',
            fontSize: 16,
            padding: '6px 12px',
            resize: 'none',
            width: 'auto',
            transition: 'all 0.3s ease-in-out',
            fontFamily: 'Segoe UI,sans-serif'
          },

          '& input[type=number], & input[type=text]': {
            // maxWidth: 300,
          },

          // '& input[type=checkbox] + div': {
          //   whiteSpace: 'initial !important',
          //   flex: 'auto !important'
          // },

          '& input[type=checkbox]': {
            height: 18,
            width: 18,
            margin: 0,
            background: '#fff',
            flex: 'none'
            // margin: direction === 'ltr' ? '0 0 5px 0 !important' : '0 0 5px 5px !important',
            // boxShadow: '0 0 3px 0 #444'
          },

          '& input[type=date]': {
            // ???
          },

          '& .ac-textBlock ul': {
            boxSizing: 'border-box'
          },

          '& .ac-textBlock ul li': {
            textAlign: direction === 'ltr' ? 'left' : 'right !important'
          },

          // '& .ac-input p': {
          //   margin: '0 5px'
          // },

          '& select.ac-input': {
            backgroundColor: '#fff',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: 5,
            outline: 'none',
            padding: '6px 12px',
            resize: 'none',
            boxShadow: '0 0 3px 1px rgba(198, 198, 198, 0.31)',
            color: '#444',
            transition: 'all 0.3s ease-in-out',
            height: '30px'
          },

          '& .ac-container': {
            borderRadius: 10,
            textAlign: direction === 'ltr' ? 'left' : 'right !important'
          },

          '& .ac-container table tr td div': {
            marginRight: 10
          },

          '& .ac-container:focus': {
            outline: 'none'
          }
        }
      };

      Object.assign(cache, { direction, result });

      return result;
    },
  };
};
