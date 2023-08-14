import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const themeConfig: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  themeConfig,
  colors: {
    liberty: {
      500: "#4D61A3",
    },
  },
});

export default theme;
