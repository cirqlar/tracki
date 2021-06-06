import { AppProps } from "next/app";
import { useEffect } from "react";

import HeadTags from "../components/layout/head";
import { updateTheme } from "../lib/theme";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    updateTheme();
  }, []);

  return (
    <>
      <HeadTags />
      <Component {...pageProps} />
    </>
  );
}

export default App;
