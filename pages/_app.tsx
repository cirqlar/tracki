import { AppProps } from "next/app";
import { useEffect } from "react";
import { updateTheme } from "../lib/theme";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    updateTheme();
  }, []);

  return <Component {...pageProps} />;
}

export default App;
