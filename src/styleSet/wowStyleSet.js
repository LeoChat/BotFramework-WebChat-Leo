export const createWowStyleSet = ({
  paddingRegular,
  accent,
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

        '& > .content': {
          paddingRight: paddingRegular,
          paddingLeft: paddingRegular,
        },

        '&.webchatleo__wow_extra_right_indent > .content': {
          paddingRight: paddingRegular * 2,
        }
      },

      '&.webchatleo__wow--rtl': {
        paddingRight: paddingRegular,

        '& > .content': {
          paddingRight: paddingRegular,
          paddingLeft: paddingRegular,

          '& .webchatleo__wow__list': {
            marginRight: paddingRegular,
          },
        },

        '&.webchatleo__wow_extra_left_indent > .content': {
          paddingLeft: paddingRegular * 2,
        }
      },
    },

    leoWowAttachment: {
      margin: paddingRegular,
      padding: paddingRegular,
      backgroundColor: accent,
    },
  };
};
