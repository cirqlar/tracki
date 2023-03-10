import { createEffect, JSX, onCleanup } from "solid-js";
import { Portal, Show } from "solid-js/web";


interface ModalProps {
	open?: boolean,
	children: JSX.Element,
	onClose: () => void,
}

const Modal = (props: ModalProps) => {
	let modalContainer: HTMLDivElement | undefined;

	const handler = (ev: any) => {
		if (!modalContainer?.contains(ev.target)) {
			props.onClose();
		}
	};

	createEffect(() => {
		if (props.open) {
			document.addEventListener('click', handler);
		} else {
			document.removeEventListener('click', handler);
		}

		onCleanup(() => {
			document.removeEventListener('click', handler);
		});
	});

	return (
		<Show when={props.open}>
			<Portal>
				<div class="absolute inset-0 bg-black/40 flex justify-center items-center p-7">
					<div class="bg-gray-300 dark:bg-gray-700 p-7 rounded-md max-w-full" ref={modalContainer}>
						{props.children}
					</div>
				</div>
			</Portal>
		</Show>
	);
};

export default Modal;