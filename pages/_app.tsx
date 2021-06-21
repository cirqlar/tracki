/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";

import { updateTheme } from "@/lib/util/theme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    updateTheme();
  }, []);

  return <Component {...pageProps} />;
}
export default MyApp;
