// @refresh reload
import { createSignal, Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  Link,
} from "solid-start";
import {ThemeProvider, useDarkMode} from "./libs/dark-mode";
import "./root.css";

export default function Root() {
  const [isInDarkMode] = useDarkMode();
  const [someNum, setMeUp] = createSignal(1);

  return (
    <ThemeProvider>
      <Html lang="en" class="relative w-full h-full overflow-hidden" classList={{ dark: isInDarkMode() }}>
        <Head>
          <Title>tracki</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />

          <Link rel="preconnect" href="https://fonts.googleapis.com" />
          <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="use-credentials" />
          <Link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400&family=Mulish&display=swap" rel="stylesheet" />
        </Head>
        <Body class="relative w-full h-full overflow-hidden bg-white dark:bg-black text-gray-800 dark:text-gray-100 heebo">
          <Suspense fallback={<div>Loading</div>}>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <div class="absolute insetx-0 top-0">
            <div>{someNum()} + {isInDarkMode() ? 'true' : 'false'}</div>
            <button onClick={() => setMeUp(c => c + 1)}>Add some number</button>
          </div>
          <Scripts />
        </Body>
      </Html>
    </ThemeProvider>
  );
}
