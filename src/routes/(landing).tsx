import { Show } from "solid-js";
import { A } from "solid-start";
import Counter from "~/components/Counter";
import useDarkMode from "~/libs/dark-mode";
import { useUser } from "~/libs/user";

import blackNopad from "~/assets/logos/black-nopad.png";
import whiteNopad from "~/assets/logos/white-nopad.png";
import Button from "~/components/styled-elements/button";

export default function Landing() {
  const [userExists] = useUser();
  const isInDarkMode = useDarkMode();

  return (
    <main class="w-full h-full flex flex-col justify-center items-center">
      <div class="flex flex-col grow justify-center items-center">
        <img src={isInDarkMode() ? blackNopad : whiteNopad} alt="tracki" />
        <h2 class="text-4xl my-5 mulish">tracki</h2>
        <Show when={userExists()} fallback={<Button>Begin</Button>}>
          <Button>Enter</Button>
        </Show>
      </div>
      <div class="grow-0 py-4 text-gray-600 dark:text-gray-100">
        <nav class="flex justify-center items-center gap-3 mb-3 text-xs">
          <A href="/about">About</A>
          <A href="/about">Terms</A>
          <A href="/about">Privacy</A>
          <a href="/about">Github</a>
        </nav>
        <p class="text-[9px] text-center">©2020 Ibitoye Ayanfeoluwa</p>
      </div>
    </main>
  );
}
