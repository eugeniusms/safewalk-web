import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "src/providers/AuthProvider";
import "../styles/globals.css";
import theme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}
