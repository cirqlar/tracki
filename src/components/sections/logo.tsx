import { useDarkMode } from "~/libs/dark-mode";
import blackNopad from "~/assets/logos/black-nopad.png";
import whiteNopad from "~/assets/logos/white-nopad.png";
import { JSX } from "solid-js";

const Logo = (props: Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'>) => {
	const [isInDarkMode] = useDarkMode();

	return (
		<img src={isInDarkMode() ? blackNopad : whiteNopad} alt="tracki" {...props}/>
	);
}

export default Logo;