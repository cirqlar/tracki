import { Show } from "solid-js";
import { A } from "solid-start";
import { useUser } from "~/libs/user";

import Button from "~/components/styled-elements/button";
import Logo from "~/components/sections/logo";

export default function Landing() {
  const [userExists] = useUser();

  return (
    <main class="w-full h-full flex flex-col justify-center items-center">
      <div class="flex flex-col grow justify-center items-center">
        <Logo class="w-28 h-28 p-4" />
        <h2 class="text-4xl mt-1 mb-5 mulish">tracki</h2>
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
