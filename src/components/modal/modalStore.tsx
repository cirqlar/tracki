import { create } from "zustand";

interface ModalElem {
	comp: React.ReactNode;
	onRequestClose?: () => unknown;
}

interface ModalState {
	elems: ModalElem[];
	elemIds: number[];
	findIndex: (id: number) => number;
	addElem: (elem: ModalElem, id?: number) => number;
	removeElem: (id: number) => void;
}

export const useModalStore = create<ModalState>()((set, get) => ({
	elems: [],
	elemIds: [],

	findIndex: (id) => get().elemIds.findIndex((val) => val === id),

	addElem: (elem, id) => {
		if (id) {
			const index = get().findIndex(id);
			if (index === -1) {
				console.error("Tried to update an element we don't have");
			} else {
				set((prev) => {
					const newElems = [...prev.elems];
					newElems[index] = elem;
					return { elems: newElems };
				});
			}
			console.log("Called add elem for id", id, "and index was", index);
			return id;
		} else {
			let newId = Math.floor(Math.random() * 100);
			let index = get().findIndex(newId);

			let count = 0;
			while (count < 100 && index !== -1) {
				newId = Math.floor(Math.random() * 100);
				index = get().findIndex(newId);
				count++;
			}

			if (index === -1) {
				set((prev) => ({
					elems: [...prev.elems, elem],
					elemIds: [...prev.elemIds, newId],
				}));

				console.log("Called add elem wihout id. New id is", newId);
				return newId;
			} else {
				console.log("Couldn't gen unique id for elem");
				return -1;
			}
		}
	},
	removeElem: (id) => {
		const index = get().findIndex(id);

		if (index !== -1) {
			set((prev) => ({
				elems: prev.elems.filter((_, i) => i !== index),
				elemIds: prev.elemIds.filter((_, i) => i !== index),
			}));
		}

		console.log("Called remove elem for id", id, "and index was", index);
	},
}));
