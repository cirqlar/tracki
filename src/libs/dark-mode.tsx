import { Accessor, createContext, createSignal, JSX, onCleanup, onMount, useContext } from "solid-js"

type ThemeInfo = [Accessor<boolean>, (mode: 'light' | 'dark' | 'os') => void];

const ThemeContext = createContext<ThemeInfo>([() => true, () => {}]);

const ThemeProvider = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
	const [isInDarkMode, setIsInDarkMode] = createSignal(true);
	
	const handler = (event: MediaQueryListEvent) => {
		setIsInDarkMode(event.matches);
	};
	
	const register = () => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handler);
	};
	
	const cleanup = () => {
		window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handler);
	};
	
	const chooseTheme = (mode: 'light' | 'dark' | 'os') => {
		if (mode === 'os') {
			localStorage.removeItem('theme');
			setIsInDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
			register();
		} else {
			localStorage.setItem('theme', mode);
			setIsInDarkMode(mode === 'dark');
			cleanup();
		}
	};
	
	onMount(() => {
		if ("theme" in localStorage) {
			setIsInDarkMode(localStorage.getItem('theme') === 'dark');
		} else {
			setIsInDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
			register();
		}
	});
	
	onCleanup(cleanup);
	
	const theme: ThemeInfo = [
		isInDarkMode,
		chooseTheme,
	];

	return (
		<ThemeContext.Provider value={theme}>
			{props.children}
		</ThemeContext.Provider>
	)
}

const useDarkMode = () => useContext(ThemeContext);

export {
	ThemeProvider,
	useDarkMode,
};