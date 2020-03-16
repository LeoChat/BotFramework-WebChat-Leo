export const createRootStyleSet = () => {
  return {
    root: {
      flex: 1,
      height: '100%',
      margin: '0 auto',
      maxWidth: 450,
      backgroundColor: 'white',

      '& *': {
        outline: 'none !important',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0) !important'
      },

      '& *:focus': {
        boxShadow: 'none !important'
      },

      /* width */
      '& > div > div::-webkit-scrollbar': {
        width: 8
      },

      /* Track */
      '& > div > div::-webkit-scrollbar-track': {
        borderRadius: 10,
        backgroundColor: 'rgba(180, 187, 205, 0.2)'
      },

      /* Handle */
      '& > div > div::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(180, 187, 205, 0.8)',
        border: '1px solid rgba(120, 120, 120, .1)',
        borderRadius: 10
      },

      /* Handle on hover */
      '& > div > div::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(180, 187, 205, 1)'
      },
    },
  };
};
