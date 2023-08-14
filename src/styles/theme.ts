import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const themeConfig: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  themeConfig,
  styles: {
    global: {
      body: {
        bg: "#09051C",
        color: "dark",
      },
    },
  },
  colors: {
    liberty: {
      500: "#4D61A3",
    },
  },
});

export default theme;
