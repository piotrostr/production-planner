import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5A5A5A",
      light: "#D9D9D9",
      dark: "#1E1E1E",
    },
    secondary: {
      main: "#FFFFFF",
      light: "#EAECF0",
    },
    background: {
      default: "#FFFFFF",
      paper: "#1D2939",
    },
    text: {
      primary: "#1E1E1E",
      secondary: "#FFFFFF",
    },
    button: {
      primary: "#5A5A5A",
      secondary: "#FFFFFF",
      primaryText: "#FFFFFF",
      secondaryText: "#1E1E1E",
      hover: "#333333",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    button: {
      primary: string;
      secondary: string;
      primaryText: string;
      secondaryText: string;
      hover: string;
    };
  }
  interface PaletteOptions {
    button: {
      primary: string;
      secondary: string;
      primaryText: string;
      secondaryText: string;
      hover: string;
    };
  }
}
