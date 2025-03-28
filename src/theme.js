import { experimental_extendTheme as extexTheme } from "@mui/material/styles";
import { cyan, deepOrange, orange, teal } from "@mui/material/colors";

// Create a theme instance.
const theme = extexTheme(
  {
    trello: {
      appBarHeight: "58px",
      boardBarHeight: "60px",
    },
    colorSchemes: {
      light: {},
      dark: {},
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "*::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "#dcdde1",
              borderRadius: "10px",
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "white",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
          // "&:hover": {
          //   borderWidth: "1px",
          // },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "0.875 rem" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          "& fieldset": { borderWidth: "0.5px !important" },
          "&:hover fieldset": { borderWidth: "1px !important" },
          "&.Mui-focused fieldset": { borderWidth: "1px !important" },
        },
      },
    },
  }
  // orthers
);

export default theme;
