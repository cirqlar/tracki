import { createSignal, onCleanup, onMount } from "solid-js"

const useDarkMode = () => {
	const [isInDarkMode, setIsInDarkMode] = createSignal(true);

	const handler = (event: MediaQueryListEvent) => {
		setIsInDarkMode(event.matches);
	}

	onMount(() => {

		console.log("What?", window.matchMedia('(prefers-color-scheme: dark)').matches);
		setIsInDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handler);
	});

	onCleanup(() => {
		window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handler);
	});

	return isInDarkMode;
}

export default useDarkMode;