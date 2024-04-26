import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../src/assets/css/globals.scss";
import { ChakraProvider } from '@chakra-ui/react'
import Header from "../src/element/Header";

const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        activeChain={activeChain}
      >
        <Header />
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
