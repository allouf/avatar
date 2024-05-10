import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react'
import Script from "next/script";

import Header from "../src/element/Header";

import "../src/assets/css/globals.scss";

const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <ThirdwebProvider
          clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
          activeChain={activeChain}
        >
          <Header />
          <Component {...pageProps} />
        </ThirdwebProvider>
      </ChakraProvider>

      {/* Google tag (gtag.js) */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-L081D7QTKT"></Script>
      <Script>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-L081D7QTKT');
          `}
      </Script>
    </>
  );
}

export default MyApp;
