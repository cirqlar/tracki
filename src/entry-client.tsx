import { mount, StartClient } from "solid-start/entry-client";
import { ThemeProvider } from "./libs/dark-mode";

mount(() => <ThemeProvider><StartClient /></ThemeProvider>, document);
