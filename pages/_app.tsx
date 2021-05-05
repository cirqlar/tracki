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
        <meta name="title" content="tracki" />
        <meta
          name="description"
          content="Tracki is a web app that helps you track whatever you want."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://ishraing.org/" /> */}
        <meta property="og:title" content="tracki" />
        <meta
          property="og:description"
          content="Tracki is a web app that helps you track whatever you want."
        />
        {/* <meta property="og:image" content="https://ishraing.org/logo/ishrai-white.jpg" /> */}

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        {/* <meta property="twitter:url" content="https://ishraing.org/" /> */}
        <meta property="twitter:title" content="tracki" />
        <meta
          property="twitter:description"
          content="Tracki is a web app that helps you track whatever you want."
        />
        {/* <meta property="twitter:image" content="https://ishraing.org/logo/ishrai-white.jpg" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
