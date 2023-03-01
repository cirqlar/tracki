import { JSX, splitProps } from "solid-js";
import BackIcon from "../icons/back";
import Logo from "./logo";

const PageHeader = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
	const [local, other] = splitProps(props, ['class']);

	return (
		<div class={`flex justify-between items-center ${local.class}`} {...other}>
			<button class="h-5 w-5" onClick={() => history.back()}><BackIcon /></button>
			<div class="h-8 w-8">
				<Logo class="w-full h-full object-contain" />
			</div>
			<div class="h-5 w-5"></div>
		</div>
	);
}

export default PageHeader;