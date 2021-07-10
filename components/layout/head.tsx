/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";

const PUBLIC_URL = process.env.NEXT_PUBLIC_VERCEL_URL ?? "localhost:3000";
const APP_URL = `https://${PUBLIC_URL}`;
const APP_NAME = "tracki";
const APP_DESCRIPTION = "Tracki is a web app that helps you track whatever you want.";

export default function HeadTags() {
  return (
    <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400&family=Mulish&display=swap"
        rel="stylesheet"
      />

      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content={APP_DESCRIPTION} />
      <meta name="keywords" content="tracker" />
      <title>{APP_NAME}</title>

      {/* <!-- Android  --> */}
      <meta name="theme-color" content="red" />
      <meta name="mobile-web-app-capable" content="#eb5757" />

      {/* <!-- iOS --> */}
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* <!-- Main Link Tags  --> */}
      <link href="/icon/favicon-16x16-42605.png" rel="icon" type="image/png" sizes="16x16" />
      <link href="/icon/favicon-32x32-42605.png" rel="icon" type="image/png" sizes="32x32" />
      <link href="/icon/favicon-48x48-42605.png" rel="icon" type="image/png" sizes="48x48" />

      {/* <!-- iOS  --> */}
      <link href="/icon/apple-57x57-42605.png" rel="apple-touch-icon" sizes="57x57" />
      <link href="/icon/apple-60x60-42605.png" rel="apple-touch-icon" />
      <link href="/icon/apple-72x72-42605.png" rel="apple-touch-icon" sizes="72x72" />
      <link href="/icon/apple-76x76-42605.png" rel="apple-touch-icon" sizes="76x76" />
      <link href="/icon/apple-114x114-42605.png" rel="apple-touch-icon" sizes="114x114" />
      <link href="/icon/apple-120x120-42605.png" rel="apple-touch-icon" sizes="120x120" />
      <link href="/icon/apple-144x144-42605.png" rel="apple-touch-icon" sizes="144x144" />
      <link href="/icon/apple-152x152-42605.png" rel="apple-touch-icon" sizes="152x152" />
      <link href="/icon/apple-180x180-42605.png" rel="apple-touch-icon" sizes="180x180" />

      {/* <!-- Android  --> */}
      <link href="/icon/android-192x192-42605.png" rel="icon" sizes="192x192" />

      {/* <!-- Manifest.json  --> */}
      <link href="/manifest.json" rel="manifest" />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={APP_NAME} />
      <meta property="og:description" content={APP_DESCRIPTION} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:url" content={APP_URL} />
      <meta property="og:image" content={`${APP_URL}/public/icon/android-192x192-42605.png`} />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={APP_URL} />
      <meta name="twitter:title" content={APP_NAME} />
      <meta name="twitter:description" content={APP_DESCRIPTION} />
      <meta name="twitter:image" content={`${APP_URL}/public/icon/android-192x192-42605.png`} />
      <meta name="twitter:creator" content="@uiAyanfe" />
    </Head>
  );
}
