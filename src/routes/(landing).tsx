import { Show } from "solid-js";
import { A } from "solid-start";
import Counter from "~/components/Counter";
import { useUser } from "~/libs/user";

export default function Landing() {
  const [userExists] = useUser();

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h2>tracki</h2>
      <Show when={userExists()} fallback={<button>Start</button>}>
        <button>Enter</button>
      </Show>
    </main>
  );
}
