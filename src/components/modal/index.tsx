import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	experimental_useEffectEvent as useEffectEvent,
	useRef,
} from "react";

interface ModalElem {
	comp: React.ReactNode;
	onRequestClose?: () => unknown;
}

interface ModalValue {
	addElem: (elem: ModalElem, id?: number) => number;
	removeElem: (id: number) => unknown;
}

const ModalContext = createContext<ModalValue>({
	addElem: () => 0,
	removeElem: () => {},
});

export function Modal(props: {
	children: React.ReactNode;
	show: boolean;
	onRequestClose?: ModalElem["onRequestClose"];
}) {
	const modalfns = useContext(ModalContext);
	const [id, setId] = useState<number>();

	const unmountedRef = useRef(false);

	const addOurElem = useEffectEvent(
		(
			comp: React.ReactNode,
			onRequestClose?: ModalElem["onRequestClose"],
		) => {
			const newId = modalfns.addElem({ comp, onRequestClose }, id);
			setId(newId);
		},
	);
	const removeOurElem = useEffectEvent(() => {
		modalfns.removeElem(id!);
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

export default function ModalProvider(props: { children: React.ReactNode }) {
	const [elems, setElems] = useState<ModalElem[]>([]);
	const [elemIds, setElemIds] = useState<number[]>([]);

	const findIndex = useEffectEvent((id: number) => {
		return elemIds.findIndex((val) => val === id);
	});

	const addElem = useCallback((elem: ModalElem, id?: number) => {
		if (id) {
			const index = findIndex(id);
			if (index === -1) {
				console.error("Tried to update an element we don't have");
			} else {
				setElems((elems) => {
					elems[index] = elem;
					return [...elems];
				});
			}
			console.log("Called add elem for id", id, "and index was", index);
			return id;
		} else {
			let id = Math.floor(Math.random() * 100);
			let index = findIndex(id);
			let count = 0;
			while (count < 100 && index !== -1) {
				id = Math.floor(Math.random() * 100);
				index = findIndex(id);
				count++;
			}

			if (index === -1) {
				setElemIds((elemIds) => [...elemIds, id]);
				setElems((elems) => [...elems, elem]);
				console.log("Called add elem wihout id. New id is", id);
				return id;
			} else {
				console.log("Couldn't gen unique id for elem");
				return -1;
			}
		}
	}, []);
	const removeElem = useCallback((id: number) => {
		const index = findIndex(id);
		if (index !== -1) {
			setElemIds((elemIds) => elemIds.filter((_, i) => i !== index));
		}
		if (index !== -1) {
			setElems((elems) => elems.filter((_, i) => i !== index));
		}

		console.log("Called remove elem for id", id, "and index was", index);
	}, []);

	const value = useMemo(
		() => ({ addElem, removeElem }),
		[addElem, removeElem],
	);

	return (
		<ModalContext.Provider value={value}>
			{props.children}

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
						className={`bg-primary-lightest absolute top-1/2 left-1/2 w-9/10 max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-sm p-6 transition-all transition-discrete duration-500 dark:bg-primary-darkest starting:scale-75 starting:opacity-0 ${i === elemIds.length - 1 ? "block" : "hidden"}`}
					>
						{elem.comp}
					</div>
				))}
			</dialog>
		</ModalContext.Provider>
	);
}
