import React, { useEffect, useState, useEffectEvent, useRef } from "react";
import { useModalStore } from "./modalStore";

interface ModalElem {
	comp: React.ReactNode;
	onRequestClose?: () => unknown;
}

export function Modal(props: {
	children: React.ReactNode;
	show: boolean;
	onRequestClose?: ModalElem["onRequestClose"];
}) {
	const [id, setId] = useState<number>();

	const addElem = useModalStore((state) => state.addElem);
	const removeElem = useModalStore((state) => state.removeElem);

	const unmountedRef = useRef(false);

	const addOurElem = useEffectEvent(
		(
			comp: React.ReactNode,
			onRequestClose?: ModalElem["onRequestClose"],
		) => {
			const newId = addElem({ comp, onRequestClose }, id);
			setId(newId);
		},
	);

	const removeOurElem = useEffectEvent(() => {
		removeElem(id!);
		setId(undefined);
	});

	const eventID = useEffectEvent(() => id);
	const shouldRemove = useEffectEvent(() => !props.show);

	useEffect(() => {
		unmountedRef.current = false;

		if (props.show) {
			addOurElem(props.children, props.onRequestClose);
		} else if (shouldRemove() && eventID()) {
			removeOurElem();
		}

		return () => {
			unmountedRef.current = true;
			setTimeout(() => {
				if ((unmountedRef.current || shouldRemove()) && eventID())
					removeOurElem();
			}, 4);
		};
	}, [props.children, props.show, props.onRequestClose]);

	return null;
}

export default function ModalContainer() {
	const elems = useModalStore((state) => state.elems);
	const elemIds = useModalStore((state) => state.elemIds);

	return (
		<dialog
			open={elemIds.length > 0}
			className="absolute top-0 left-0 h-full w-full overflow-hidden bg-black/50 text-inherit transition-all transition-discrete duration-500 not-open:bg-transparent starting:bg-transparent"
		>
			<button
				className="absolute h-full w-full"
				onClick={() => {
					if (elems.length > 0) {
						elems[elems.length - 1].onRequestClose?.();
					}
				}}
			></button>

			{elems.map((elem, i) => (
				<div
					key={elemIds[i]}
					className={`absolute top-1/2 left-1/2 w-9/10 max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-sm bg-primary-lightest p-6 transition-all transition-discrete duration-500 dark:bg-primary-darkest starting:scale-75 starting:opacity-0 ${i === elemIds.length - 1 ? "block" : "hidden"}`}
				>
					{elem.comp}
				</div>
			))}
		</dialog>
	);
}
