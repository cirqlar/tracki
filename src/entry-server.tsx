import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";
import { ThemeProvider } from "./libs/dark-mode";

export default createHandler(
  renderAsync((event) => <ThemeProvider><StartServer event={event} /></ThemeProvider>)
);
