import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import { updateTheme } from "../lib/theme";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    updateTheme();
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400&family=Mulish&display=swap"
          rel="stylesheet"
        />

        <title>tracki</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
