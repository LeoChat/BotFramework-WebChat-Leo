export const createWowStyleSet = ({
  paddingRegular,
  bubbleMaxWidth,
  bubbleMinWidth,
}) => {
  return {
    leoWowLayout: {
      // Browser quirks: Firefox has no way to hide scrollbar and while keeping it in function
      // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
      '@supports (-moz-appearance: none)': {
        marginBottom: -17
      },

      '&:not(.webchatleo__wow--rtl)': {
        paddingLeft: paddingRegular,

        '&.webchatleo__wow_indented_content > .content': {
          marginLeft: paddingRegular
        },

        '& > .content': {
          paddingRight: paddingRegular,

          '& > .webchatleo__wow__item_indented': {
            marginLeft: paddingRegular
          },

          '& > ul > li:not(:last-child)': {
            marginRight: paddingRegular
          }
        },

        '&.webchatleo__wow_extra_right_indent > .content': {
          paddingRight: paddingRegular * 2
        }
      },

      '&.webchatleo__wow--rtl': {
        paddingRight: paddingRegular,

        '&.webchatleo__wow_indented_content > .content': {
          marginRight: paddingRegular
        },

        '& > .content': {
          paddingLeft: paddingRegular,

          '& > .webchatleo__wow__item_indented': {
            marginRight: paddingRegular
          },

          '& > ul > li:not(:last-child)': {
            marginLeft: paddingRegular
          }
        },

        '&.webchatleo__wow_extra_right_indent > .content': {
          paddingLeft: paddingRegular * 2
        }
      },

      '& > .content': {
        '& > ul': {
          '&:not(:first-child)': {
            marginTop: paddingRegular
          },

          '& > li': {
            maxWidth: bubbleMaxWidth,
            minWidth: bubbleMinWidth
          }
        }
      }
    },

    leoWowAttachment: {
      margin: paddingRegular,
      padding: paddingRegular,
    },
  };
};
